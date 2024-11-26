from django.contrib import admin
from .models import Game, Movie, Serie


# Register your models here.
class MidiaAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "publish_date", "studio"]
    search_fields = ["title", "studio"]
    list_filter = ["publish_date"]
    list_display_links = ["id", "title"]


admin.site.register(Movie, MidiaAdmin)
admin.site.register(Serie, MidiaAdmin)
admin.site.register(Game, MidiaAdmin)
