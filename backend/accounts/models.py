from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
import uuid
from django.utils import timezone


# Create your models here.

# Create your models here.
class Users(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255,unique=True, verbose_name=_("Email Address"))
    first_name = models.CharField(max_length=100, verbose_name=_("First Name"))
    last_name =     models.CharField(max_length=100, verbose_name=_("Last Name"))
    # gender = models.CharField(max_length=10, choices=VendorType.choices, default=VendorType.DEFAULT)
    # phone = models. 
    is_active = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_staff = models.BooleanField(default=False) # official management accounts (superusers, admins and author)
    is_superuser = models.BooleanField(default=False) # for super admins only (superuser)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD="email"

    REQUIRED_FIELDS=["first_name", "last_name"]

    objects = UserManager()

    # check later
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._password = self.password  # Store the initial password


    def __str__(self):
        return self.email
        
    def save(self, *args, **kwargs):
        if self.pk and self.password != self._password:
            self.last_updated = timezone.now()  # Update last_updated field if password has changed
        super().save(*args, **kwargs)
        self._password = self.password  # Update the stored password

    # def save(self, *args, **kwargs):
    #     # Update the updatedAt field with the current timestamp before saving
    #     self.last_updated = get_current_timestamped()
    #     super(Users, self).save(*args, **kwargs)

    @property
    def get_full_name(self):    
        return f"{self.last_name} {self.first_name}"
        
    # def has_permission(self, permission):
    #     if self.is_superuser:
    #         return True
    #     role_permissions = {
    #         'admin': ['can_add_user', 'can_remove_user', 'can_change_vendor_access'],
    #         'vendor': [],
    #         'affiliate': [],
    #         'user': []
    #     }

    #     return permission in role_permissions.get(self.role, [])

    def token(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
