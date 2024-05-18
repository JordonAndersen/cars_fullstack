# move_app/serializers.py
from rest_framework import serializers
from .models import Advertisement
from car_app.serializers import CarSerializer
from app_user_app.serializers import AppUserSerializer
from car_model_app.serializers import CarModelSerializer
from car_app.models import Car
from app_user_app.models import AppUser
from car_model_app.models import CarModel

class AdvertisementSerializer(serializers.ModelSerializer):
    

    car_id = CarSerializer(many=False)
    seller_account_id = AppUserSerializer(many=False)

    # advertisement_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    

    class Meta:

        model = Advertisement
        fields = ('advertisement_date', 'seller_account_id', 'car_id')


    def create(self, validated_data):

       
        car_data = validated_data.get('car_id')
        app_user_data = validated_data.get('seller_account_id')
        car_model_data = car_data.get('car_model_id')
        

        car_model = CarModel.objects.create(**car_model_data)
        validated_data['car_id']['car_model_id'] = car_model

        car = Car.objects.create(**car_data)
        validated_data['car_id'] = car

        app_user = AppUser.objects.create(**app_user_data)
        validated_data['seller_account_id'] = app_user


        advertisement = Advertisement.objects.create(**validated_data)
        return advertisement
    


    