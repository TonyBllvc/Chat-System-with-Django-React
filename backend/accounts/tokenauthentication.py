import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.utils import timezone
import uuid

User=get_user_model()

class JWTAuthentication(BaseAuthentication):

    @staticmethod
    def generate_token(payload): # For generating tokens
        # expiration = datetime.utcnow() + timedelta(hours=24)
        expiration = timezone.now() + timedelta(hours=24) # check this time format out later
        payload['exp'] = expiration.timestamp()
        token=jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
        return token
    
    def extract_token(self, request): # To get token
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(" ")[1]
        return None
    
    def verify_token(self, payload):
        if "exp" not in payload:
            raise InvalidTokenError("Token has no expiration")
        
        exp_timestamp=payload['exp']
        current_timestamp=timezone.now().timestamp()

        if current_timestamp > exp_timestamp:
            raise ExpiredSignatureError('Token has expired')
        
    def authenticate(self, request):
        token=self.extract_token(request=request)
        if token is None:
            return None
        
        try: 
            payload=jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            self.verify_token(payload=payload)

            user_id=payload['id']
            user_id=uuid.UUID(user_id)
            user=User.objects.get(id=user_id)
            return (user, None)
        
        except(InvalidTokenError, ExpiredSignatureError, User.DoesNotExist):
            raise AuthenticationFailed("Invalid token")