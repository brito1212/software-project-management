from django.urls import path
from .views import ReviewView, CommentView
from rest_framework.routers import DefaultRouter

app_name = "review"
router = DefaultRouter()
router.register(r"", ReviewView, basename="review")
router.register(r"comment", CommentView, basename="comment")

urlpatterns = router.urls
