from django.urls import path
from .views import ListaView
from rest_framework.routers import DefaultRouter

app_name = "lista"
router = DefaultRouter()
router.register(r"", ListaView, basename="lista")
urlpatterns = router.urls
