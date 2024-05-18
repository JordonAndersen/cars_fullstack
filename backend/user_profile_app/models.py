from django.db import models
from app_user_app.models import AppUser

class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)  
    account = models.ForeignKey(AppUser, on_delete=models.CASCADE)  
    street_name = models.CharField(blank=True, max_length=255, null=True)  
    street_number = models.PositiveIntegerField(blank=True, null=True) 
    zip_code = models.PositiveIntegerField(blank=True, null=True)  
    city = models.CharField(max_length=255)



    def __str__(self):
        return f"User Profile: {self.account}, Address: {self.street_number} {self.street_name}, {self.city}, {self.zip_code}"
    
    def change_street(self, street):

        self.street_name = street
    