import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Midia(models.Model):
    title = models.CharField(max_length=100)
    publish_date = models.DateField()
    description = models.TextField()
    genres = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    platforms = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    studio = models.CharField(max_length=100)
    banner = models.CharField(max_length=300, null=True, blank=True)
    media_type = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.title


class Movie(Midia):
    duration = models.DurationField()
    director = models.CharField(max_length=100)
    cast = ArrayField(models.CharField(max_length=100), blank=True, null=True)

    def save(self, *args, **kwargs):
        self.media_type = 'movie'
        super().save(*args, **kwargs)


class Serie(Midia):
    seasons = models.IntegerField()
    episodes = models.IntegerField()
    created_by = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.media_type = 'serie'
        super().save(*args, **kwargs)


class Game(Midia):
    publisher = models.CharField(max_length=100)
    avarage_playtime = models.DurationField()

    def save(self, *args, **kwargs):
        self.media_type = 'game'
        super().save(*args, **kwargs)
