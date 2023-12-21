from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=255, default='')
    lastName = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=20, default='', blank=True)
    city = models.CharField(max_length=50, default='', blank=True)


def __str__(self):
    return self.first_name
