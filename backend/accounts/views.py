from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from user_profile.models import UserProfile
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator


# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        # Check for missing credentials
        try:
            username = data['username']
            password = data['password']
            passwordConfirmation = data['passwordConfirmation']
        except KeyError as credential:
            print('Invalid credential:', credential)
            string_credential = credential.__str__().strip("'")
            message = f'Please provide a valid {string_credential}.'
            return Response({'message': message}, status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if password == passwordConfirmation:
            if User.objects.filter(username=username).exists():
                return Response({'message': 'Username already exists'}, status.HTTP_409_CONFLICT)
            else:
                if len(password) < 8:
                    return Response(
                        {'message': 'Password must be at least 8 characters'},
                        status.HTTP_400_BAD_REQUEST,
                    )
                else:
                    # Create a user
                    user = User.objects.create_user(username=username, password=password)

                    # and a user profile for that user
                    UserProfile.objects.create(
                        user=user, firstName='', lastName='', phone='', city=''
                    )
                    return Response({'message': 'User created successfully.'})
        else:
            return Response({'message': 'Passwords do not match.'}, status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data

        # Check for missing credentials
        try:
            username = data['username']
            password = data['password']
        except KeyError as credential:
            print('Invalid credential:', credential)
            string_credential = credential.__str__().strip("'")
            message = f'Please provide a valid {string_credential}.'
            return Response({'message': message}, status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'message': 'User authenticated.', 'username': user.username})
        else:
            return Response(
                {'message': 'Incorrect username or password.'}, status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response({'message': 'User logged out.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'message': 'CSRF cookie set.'})


class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        # print(type(request.user))
        # print(dir(request.user))
        # print("is_authenticated:", request.user.is_authenticated)
        # print("is_anonymous:", request.user.is_anonymous)
        # print("id:", request.user.id)

        return Response({'isAuthenticated': request.user.is_authenticated})


class ConfirmPasswordView(APIView):

    def post(self, request, format=None):

        # Check for missing credentials
        try:
            user = User.objects.get(id=request.user.id)
            password = request.data['password']
        except KeyError as credential:
            print('Invalid credential:', credential)
            string_credential = credential.__str__().strip("'")
            message = f'Please provide a valid {string_credential}.'
            return Response({'message': message}, status.HTTP_400_BAD_REQUEST)

        pass_match = user.check_password(password)

        if pass_match:
            return Response({'message': 'Passwords match.'})
        else:
            return Response(
                {'message': 'Incorrect password.'}, status.HTTP_401_UNAUTHORIZED
            )


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        print(user)
        user.delete()

        return Response({'message': 'User deleted successfully.'}, status.HTTP_204_NO_CONTENT)
