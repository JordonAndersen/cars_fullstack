from django.urls import path, register_converter
# Explicit imports
from .views import AllCars, SelectedCar
# Remember all urls are prefaced by http://localhost:8000/api/v1/cars/

from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')


urlpatterns = [
    # Currently only takes GET requests
    path('', AllCars.as_view(), name='all_cars'),
    path('<int_or_str:id>/', SelectedCar.as_view(), name='selected_car')
]