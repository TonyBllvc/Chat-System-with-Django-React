from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Please enter a valid email address")
        

        email = self.normalize_email(email)

        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        
        user.is_active=True
        user.save(using=self._db)
        
        return user
    
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)


        user = self.create_user(
            email, password, **extra_fields
        )
        
        user.is_superuser = True
        user.is_staff = True
        # user.is_verified=True
        user.is_active=True
        # user.role='admin'
        # user.vendor_access='Default'

        user.save(using=self._db)
        return user
    