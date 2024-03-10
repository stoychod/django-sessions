from django.urls import path
from .views import (
    SignupView,
    GetCSRFToken,
    LoginView,
    LogoutView,
    CheckAuthenticatedView,
    ConfirmPasswordView,
    DeleteAccountView,
)

urlpatterns = [
    path("csrf_cookie/", GetCSRFToken.as_view()),
    path("register/", SignupView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("authenticated/", CheckAuthenticatedView.as_view()),
    path("confirm_password/", ConfirmPasswordView.as_view()),
    path("delete/", DeleteAccountView.as_view()),
]
