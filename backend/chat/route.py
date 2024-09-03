from django.urls import path, re_path
from.consumers import PersonalChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<id>[^/]+)/$', PersonalChatConsumer.as_asgi()),
    # path('ws/chat/<str:id/', PersonalChatConsumer.as_asgi())
]