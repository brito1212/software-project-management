from django.contrib import admin
from .models import Lista


# Register your models here.
class ListaAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "user")
    list_display_links = ("id", "name")
    search_fields = ("name", "user")


admin.site.register(Lista)
