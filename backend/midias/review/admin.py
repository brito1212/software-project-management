from django.contrib import admin

from .models import Review, Comment

# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "rate", "title", "midia", "user")
    list_filter = ("rate", "midia", "user")
    search_fields = ("title", "user")


admin.site.register(Review, ReviewAdmin)
admin.site.register(Comment)
