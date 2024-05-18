from django.db import models
from django.core import validators as v
from .validators import validate_name
from django.core.exceptions import ValidationError

# Create your models here.
class AppUser(models.Model):
    account_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255, validators=[validate_name])
    last_name =  models.CharField(max_length=255, validators=[validate_name])
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)


    def __str__(self):
        return f"App User: {self.first_name} {self.last_name}"