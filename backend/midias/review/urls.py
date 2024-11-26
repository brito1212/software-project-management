from django.urls import path
from .views import ReviewView
from rest_framework.routers import DefaultRouter

app_name = "review"
router = DefaultRouter()
router.register(r"", ReviewView, basename="review")
urlpatterns = router.urls