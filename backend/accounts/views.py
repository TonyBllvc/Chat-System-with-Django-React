from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from accounts.tokenauthentication import JWTAuthentication
from rest_framework import status
import uuid


# Create your views here.
@api_view(['POST'])
def register_user(request):
    serializer=RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success', 'message':serializer.data}, status=201)
    return Response({ 'status': 'error', 'detail':serializer.errors}, status=400)

 
@api_view(['POST'])
def login_user(request):
    serializer=LoginSerializer(data=request.data)

    if serializer.is_valid():
        print('hello')
        data=serializer.data
        token=JWTAuthentication.generate_token(payload=data)
        print(token)
        print('okay')
        return Response({'status': 'success', "message": "Login successful", "token": token, "data": data}, status=status.HTTP_202_ACCEPTED)
    return Response({ 'status': 'error', 'detail': serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def delete_user(request, id=None):
    try:
        uuid_obj = uuid.UUID(id)
        item = get_object_or_404(get_user_model(), id=uuid_obj)
        item.delete()
        return Response({"status": "success", 'message': 'Deleted successfully'}, status=status.HTTP_200_OK)
    except ValueError:
        return Response({"status": "error", 'message': 'Invalid UUID format'}, status=status.HTTP_400_BAD_REQUEST)
