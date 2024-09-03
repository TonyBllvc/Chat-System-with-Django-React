from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Users
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed


# working
class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model=Users
        fields=['id', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs={'password': {'write_only': True}}

    def validate(self, attrs):
        email = attrs.get('email', '')
    
        user_exist = get_user_model().objects.filter(email=email).exists()
        if user_exist:
            raise serializers.ValidationError({"email": "User with this email already exists."})
        
        # if email == 'tony@gmail.com':
        #     raise serializers.ValidationError({"email": "This email is barred from registering."})
    
        return attrs

    def create(self, validated_data):
        email=validated_data['email']
        password=validated_data['password']
        
        user=get_user_model().objects.create_user(
            email=email,
            password=password,
            first_name=validated_data.get('first_name', ''), #mao=king it optional
            last_name=validated_data.get('last_name', ''),
        )
        
        return user
    
    
class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=228)
    # id=serializers.UUIDField(read_only=True)
    first_name=serializers.CharField(max_length=68, read_only=True)
    last_name=serializers.CharField(max_length=68, read_only=True)
    # confirm_password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    # confirm_password=serializers.CharField(max_length=68, min_length=6, write_only=True)


    class Meta:
        model=Users
        fields = ['email', 'password', 'first_name', 'last_name', 'id']

    def validate(self, data): # data keyword is allowed
        email = data.get('email', '')
        password = data.get('password', '')
        # remember_me = data.get('remember_me')

        if email is None:
            raise serializers.ValidationError("User email required")
        
        if password is None:
            raise serializers.ValidationError("User password required")

        user = Users.objects.filter(email=email).first()
        
        print(f'save: {user}')
        if not user or not user.check_password(password):
            raise AuthenticationFailed('Incorrect login credentials!', 401)

        # user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError(_('Invalid input.'), status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            raise serializers.ValidationError(_('Inactive user.'), status.HTTP_401_UNAUTHORIZED)

        return {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "id": user.id
        }