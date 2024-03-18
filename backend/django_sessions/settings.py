"""
Django settings for django_sessions project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from os import getenv
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# print(BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# Get the secret key from environment variable if exists,
# set it to a dummy value otherwise
SECRET_KEY = getenv('SECRET_KEY', 'very_secret_key')

# SECURITY WARNING: don't run with debug turned on in production!
# Get the DEBUG environment variable, default to False
DEBUG = getenv('DEBUG') == 'True'

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Register apps
    'accounts.apps.AccountsConfig',
    'user_profile.apps.UserProfileConfig',
    # Register rest framework and corsheaders
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_sessions.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['build'],  # template folder
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# print(TEMPLATES[0]["DIRS"])

WSGI_APPLICATION = 'django_sessions.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        # Get database settings from environment
        'ENGINE': getenv('DB_ENGINE'),
        'NAME': getenv('DB_NAME'),
        'USER': getenv('DB_USER'),
        'PASSWORD': getenv('DB_PASSWORD'),
        'HOST': getenv('DB_HOST'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
# static dirs where React static files will go
# !IMPORTANT - The last segment of the path MUST match STATIC_URL
# i.e. if STATIC_URL='assets/' STATICFILES_DIRS MUST be 'dist/assets'
STATICFILES_DIRS = ['build/static']

# print(STATICFILES_DIRS)

REST_FRAMEWORK = {
    # To access any view the user has to be authenticated. Any unauthenticated
    # access to a view needs to be allowed explicitly in that view
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    # Set the default authentication scheme to the built in SessionAuthentication
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# If 'Origin' header does not match the 'Host' header,
# (e.g.Host: localhost:5173, Origin: http://localhost:5173)
# you need to include the Origin in the CSRF_TRUSTED_ORIGINS list
# https://docs.djangoproject.com/en/4.2/ref/settings/#csrf-trusted-origins
CSRF_TRUSTED_ORIGINS = ['http://localhost:5173', 'http://192.168.10.17:5173']
