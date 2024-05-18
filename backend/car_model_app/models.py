from django.db import models

# Create your models here.

class CarModel(models.Model):

    make = models.CharField(null = False, blank = False)
    model = models.CharField(null = False, blank = False)


    def __str__(self):
        return f"Model: {self.model}, Make: {self.make}"