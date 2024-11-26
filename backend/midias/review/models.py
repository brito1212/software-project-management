from django.db import models
from midia.models import Midia
from user.models import User





# Create your models here.
class Review(models.Model):
    class Rating(models.IntegerChoices):
        ZERO = 0
        ONE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5

    rate = models.IntegerField(choices=Rating.choices)
    title = models.CharField(max_length=100)
    content = models.TextField()
    midia = models.ForeignKey(Midia, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title