from django.urls import path, register_converter
from .views import Advertisements, SelectedAdvert
from .converters import IntStrDateConverter



# Remember all urls are prefaced by http://localhost:8000/api/v1/advertisments/

register_converter(IntStrDateConverter, 'int_or_string')


urlpatterns = [
    # Currently only takes GET requests
    path('', Advertisements.as_view(), name='all_advertisements'),
    path('<int_or_string:id>/', SelectedAdvert.as_view(), name='selected_app_user')
]