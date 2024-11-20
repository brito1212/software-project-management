from django.db import models
from midia.models import Midia
from user.models import User


# Create your models here.
class Lista(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    midias = models.ManyToManyField(Midia, related_name="midias")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listas")

    def __str__(self):
        return self.name
