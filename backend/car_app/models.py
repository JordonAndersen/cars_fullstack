from django.db import models
from django.core.exceptions import ValidationError
from .validators import validate_max_door_number, validate_min_door_number
from car_model_app.models import CarModel


# Create your models here.

class Car(models.Model):

    car_model_id =  models.ForeignKey(CarModel, on_delete=models.CASCADE)
    number_of_owners = models.IntegerField(null=True)
    registration_number = models.CharField(null=False, blank=False, unique=True)
    manufacture_year =  models.IntegerField(null=False, blank=False)
    number_of_doors = models.IntegerField(null=False, blank=False, validators=[validate_max_door_number, validate_min_door_number])
    mileage = models.IntegerField(null=False, blank=False)


    def __str__(self):
        return f'CarModel ID: {self.car_model_id}, Registration_number: {self.registration_number}, Number of Owners:{self.number_of_owners}, Mileage: {self.mileage}'

