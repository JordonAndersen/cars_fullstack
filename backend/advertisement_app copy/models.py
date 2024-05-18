from django.db import models
from django.db import utils
from app_user_app.models import AppUser
from car_app.models import Car

# Create your models here.

class Advertisement(models.Model):
    advertisement_date = models.DateTimeField(auto_now_add=True)
    seller_account_id = models.ForeignKey(
        AppUser, on_delete = models.SET_NULL, null = True, related_name = '+')
    car_id = models.ForeignKey(
        Car, on_delete = models.SET_NULL, null = True, related_name = '+')

    def __str__(self):
        return f"advertisement date: {self.advertisement_date}, Seller Account ID: {self.seller_account_id}, Car ID: {self.car_id}"