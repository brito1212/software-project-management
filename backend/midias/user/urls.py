from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    AllUsers,
    CreateUser,
    CurrentUser,
    ForgetPassword,
    PasswordReset,
    UpdateUser,
    UserView,
)

app_name = "user"
router = DefaultRouter()
router.register(r"user", UserView, basename="user")
urlpatterns = router.urls + [
    path("create/", CreateUser.as_view(), name="create_user"),
    path("all-users/", AllUsers.as_view(), name="all"),
    path("current-user/", CurrentUser.as_view(), name="current"),
    path("update/<int:pk>", UpdateUser.as_view(), name="update_user"),
    path("password-forget/", ForgetPassword.as_view(), name="password_forget"),
    path("password-reset/", PasswordReset.as_view(), name="password_reset"),
]
