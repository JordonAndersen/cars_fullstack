from rest_framework import serializers
from .models import Car
from car_model_app.models import CarModel
from car_model_app.serializers import CarModelSerializer

class CarSerializer(serializers.ModelSerializer):

    car_model_id = CarModelSerializer(many=False)
    class Meta:
        model = Car
        fields = ('number_of_owners', 'car_model_id', 'registration_number', 'manufacture_year', 'number_of_doors', 'mileage')



    def create(self, validated_data):

        car_model_data = validated_data.get('car_model_id')
        car_model = CarModel.objects.create(**car_model_data)
    
        validated_data["car_model_id"] = car_model
        new_car = Car.objects.create(**validated_data)

        return new_car
