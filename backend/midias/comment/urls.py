from rest_framework.routers import DefaultRouter

from .views import CommentView

app_name = "comment"
router = DefaultRouter()
router.register(r"", CommentView, basename="comment")
urlpatterns = router.urls
