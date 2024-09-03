from channels.generic.websocket import AsyncWebsocketConsumer
import uuid
import json

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        request_user=self.scope['user'] # request the user id
        # print(request_user, 'User')
        if request_user.is_authenticated:
            chat_with_user=self.scope['url_route']['kwargs']['id'] # user to chat with
            user_ids=[[str(request_user.id), chat_with_user]] # sort tje id..
            user_ids=sorted(user_ids) #... maintain the order
            self.room_group_name=f'chat_{user_ids[0]}-{user_ids[1]}'
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def receive(self, text_data=None, bytes_data=None):
        data=json.loads(text_data)
        message=data['message']
        # Save messages to db
        await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message
                }

        )

    async def disconnect(self, code):
        self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
        )
        # return await super().disconnect(code)

    async def chat_message(self, event):
        message=event['message']
        await self.send(text_data=json.dump({
            "message": message
        }))