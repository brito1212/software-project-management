import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Platforms(models.Model):
    class Platforms_type(models.TextChoices):
        PC = "PC"
        PLAYSTATION = "Playstation"
        XBOX = "Xbox"
        NINTENDO = "Nintendo"
        MOBILE = "Mobile"
        VR = "VR"
        NETFLIX = "Netflix"
        AMAZON_PRIME = "Amazon Prime"
        DISNEY_PLUS = "Disney Plus"
        HBO_MAX = "HBO Max"
        APPLE_TV = "Apple TV"
        YOUTUBE = "Youtube"
        TWITCH = "Twitch"
        STEAM = "Steam"
        ORIGIN = "Origin"
        EPIC_GAMES = "Epic Games"
        GOG = "GOG"
        UPLAY = "Uplay"
        BATTLE_NET = "Battle.net"
        XBOX_GAME_PASS = "Xbox Game Pass"
        PLAYSTATION_NOW = "Playstation Now"
        NINTENDO_ONLINE = "Nintendo Online"
        GOOGLE_PLAY = "Google Play"
        APP_STORE = "App Store"

    name = models.CharField(max_length=100, choices=Platforms_type.choices)

    def __str__(self):
        return self.name


# Create your models here.
class Midia(models.Model):
    title = models.CharField(max_length=100)
    publish_date = models.DateField()
    description = models.TextField()
    genres = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    platforms = models.ManyToManyField(Platforms, related_name="+")
    studio = models.CharField(max_length=100)
    banner = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.title


class Movie(Midia):
    duration = models.TimeField()
    director = models.CharField(max_length=100)
    cast = ArrayField(models.CharField(max_length=100), blank=True, null=True)


class Serie(Midia):
    seasons = models.IntegerField()
    episodes = models.IntegerField()


class Game(Midia):
    publisher = models.CharField(max_length=100)
    release_date = models.DateField()
    avarage_price = models.DecimalField(max_digits=10, decimal_places=2)
    avarage_playtime = models.TimeField()
