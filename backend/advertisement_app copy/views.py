from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import Advertisement
from car_app.models import Car
from app_user_app.models import AppUser
from .serializers import AdvertisementSerializer
import json


# Create your views here.
# def advertisement_response(request):
#     return render(request)

class Advertisements(APIView):
    def get(self, request):
        Advert = Advertisement.objects.order_by('advertisement_date')
        serializer = AdvertisementSerializer(Advert, many=True)
        return Response(serializer.data)
    
    def post (self, request):
        serializer = AdvertisementSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SelectedAdvert(APIView):
    def get_advert(self, id):
        if type(id) == int:
            return Advertisement.objects.get(id=id)
        else:
            return Advertisement.objects.get(name = id)
    
    def get(self, request, id):
        advertisement = self.get_advert(id)
        serialized_advertisement = AdvertisementSerializer(advertisement, many=False)
        return Response(serialized_advertisement.data)
  
    def delete(self, request, id):
        advertisement = self.get_advert(id)

        serialized_advertisement = AdvertisementSerializer(advertisement, many=False)

        make = serialized_advertisement['car_id']['car_model_id']['make'].value
        model = serialized_advertisement['car_id']['car_model_id']['model'].value
        registration_number = serialized_advertisement['car_id']['registration_number'].value

        first_name = serialized_advertisement['seller_account_id']['first_name'].value
        last_name = serialized_advertisement['seller_account_id']['last_name'].value


        advertisement.delete()
        return Response(f"Advertisement: {advertisement.id} was deleted. \n Car Make and Model: {make} {model} \n Registration: {registration_number} \n Owned by: {first_name} {last_name}.")
