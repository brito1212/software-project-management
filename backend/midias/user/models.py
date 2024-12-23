from datetime import timedelta
from django.utils import timezone
import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.utils.translation import gettext_lazy as _


HOURS_TO_EXPIRE_TOKEN = 12


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, first_name, password, **other_fields):
        if not email:
            raise ValueError(_("Please provide an email address"))

        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, first_name=first_name, **other_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, first_name, password, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError(_("Please assign is_staff=True for superuser"))
        if other_fields.get("is_superuser") is not True:
            raise ValueError(_("Please assign is_superuser=True for superuser"))
        return self.create_user(email, username, first_name, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(_("User Name"), max_length=150)
    first_name = models.CharField(_("First Name"), max_length=150)
    last_name = models.CharField(_("last Name"), max_length=150)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    seguidores = models.ManyToManyField(
        "self", symmetrical=False, related_name="lista_seguindo", blank=True
    )
    seguindo = models.ManyToManyField(
        "self", symmetrical=False, related_name="lista_seguidores", blank=True
    )
    profile_image = models.ImageField(upload_to='profile_images', blank=True, null=True)
    banner = models.ImageField(upload_to='banner', blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name"]

    def __str__(self):
        return self.email


class PasswordResetToken(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="password_reset_tokens"
    )
    token = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    expiration = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.expiration = timezone.now() + timedelta(hours=HOURS_TO_EXPIRE_TOKEN)
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expiration

    class Meta:
        verbose_name = "password reset token"
        verbose_name_plural = "password reset tokens"
        db_table = "password_reset_token"

    def __str__(self):
        return self.token
