from django.urls import path, register_converter
# Explicit imports
from .views import AllAppUsers, SelectAppUsers
# Remember all urls are prefaced by http://localhost:8000/api/v1/appusers/

from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')


urlpatterns = [
    # Currently only takes GET requests
    path('', AllAppUsers.as_view(), name='all_app_user'),
    path('<int_or_str:id>/', SelectAppUsers.as_view(), name='selected_app_user')
]