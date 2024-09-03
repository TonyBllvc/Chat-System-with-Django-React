from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from chat.serializers import UserGetSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

User=get_user_model() #object

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated]) # there is a problem with this permission class
def get_user_list(request):
    user=request.user
    data=request.data
    try:
        # print(user.id)
        user_obj=User.objects.exclude(id=user.id)
        serializer=UserGetSerializer(user_obj, many=True)

        return Response({ 'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK) 
    except Exception as e:
            return Response({"status": "error", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    