# from django.contrib.auth.models import User
# from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer


# class GetUserProfileView(APIView):
#     def get(self, request, format=None):
#         profile = UserProfile.objects.get(user_id=request.user.id)
#         user_profile = UserProfileSerializer(profile)
#         return Response({'profile': user_profile.data})

# class UpdateUserProfileView(APIView):
#     def patch(self, request, format=None):
#         print(request.data)
#         current_profile = UserProfile.objects.filter(user_id=request.user.id)
#         current_profile.update(**request.data)

#         updated_profile = UserProfile.objects.get(user_id=request.user.id)
#         serialized_profile = UserProfileSerializer(updated_profile)

#         return Response({'profile': serialized_profile.data})


class RetrieveUpdateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def get_object(self):
        queryset = self.get_queryset()

        object = queryset.get(user=self.request.user.id)
        return object
