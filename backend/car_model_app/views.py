# pokemon_app/views.py
# We will import the following to read and return JSON data more efficiently
from rest_framework.views import APIView, Response
from rest_framework import status

# We want to bring in our model
from .models import CarModel
from car_model_app.models import CarModel

# We will utilize serializer to turn our QuerySets into
# binary string
from django.core.serializers import serialize
from .serializers import CarModelSerializer

# Json.loads will turn binary strings into JSON data
import json


class AllCarModels(APIView):

    def get(self, request):
        cars = CarModel.objects.order_by('pk')
        cars_serialized = CarModelSerializer(cars, many=True)
        return Response(cars_serialized.data)
    
    def post(self, request):
        serializer = CarModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SelectedCarModel(APIView):

    def get_car_model(self, id):

        if type(id) == int:
            return CarModel.objects.get(id = id)
        else:
            return CarModel.objects.get(registration_number = id)
        
    def get(self, request, id):

        car_model = self.get_car_model(id)
        car_model_serialized = CarModelSerializer(car_model, many=False)
        return Response(car_model_serialized.data)

    def delete(self, request, id):
        car_model = self.get_car_model(id)
        serialized_car = CarModelSerializer(car_model, many=False)

        car_model.delete()
        return Response(f"{car_model} has been deleted")