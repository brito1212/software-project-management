from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "username", "is_active", "is_staff", "is_superuser"]
    search_fields = ["email", "username"]
    list_filter = ["is_active", "is_staff", "is_superuser"]
    list_display_links = ["id", "username"]
    search_fields = ["email", "username"]


# Register your models here.
admin.site.register(User, UserAdmin)
