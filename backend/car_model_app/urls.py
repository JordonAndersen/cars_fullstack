from django.urls import path, register_converter
# Explicit imports
from .views import AllCarModels, SelectedCarModel
from .converters import IntOrStrConverter
# Remember all urls are prefaced by http://localhost:8000/api/v1/carmodels/

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    # Currently only takes GET requests
    path('', AllCarModels.as_view(), name='all_cars'),
    path('<int_or_str:id>/', SelectedCarModel.as_view(), name='selected_car_model')
]