from django.urls import path
from .views import RetrieveUpdateProfileView  # , GetUserProfile, UpdateUserProfile

urlpatterns = [
    # path('user/', GetUserProfileView.as_view()),
    # path('update/', UpdateUserProfileView.as_view()),
    path('', RetrieveUpdateProfileView.as_view())
]
