from django.urls import path
from .views import (
    AllUsers,
    CreateUser,
    CurrentUser,
    ForgetPassword,
    PasswordReset,
    UpdateUser,
)

app_name = "user"
urlpatterns = [
    path("create/", CreateUser.as_view(), name="create_user"),
    path("all-users/", AllUsers.as_view(), name="all"),
    path("current-user/", CurrentUser.as_view(), name="current"),
    path("update/<int:pk>", UpdateUser.as_view(), name="update_user"),
    path("password-forget/", ForgetPassword.as_view(), name="password_forget"),
    path("password-reset/", PasswordReset.as_view(), name="password_reset"),
]
