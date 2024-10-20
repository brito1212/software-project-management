from django.urls import path
from .views import GameView, MovieView, SerieView
from rest_framework.routers import DefaultRouter

app_name = "midia"
router = DefaultRouter()
router.register(r"game", GameView, basename="game")
router.register(r"movie", MovieView, basename="movie")
router.register(r"serie", SerieView, basename="serie")

urlpatterns = router.urls
