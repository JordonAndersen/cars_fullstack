from django.urls import path, register_converter
# Explicit imports
from .views import AllUserProfiles, SelectUserProfiles
# Remember all urls are prefaced by http://localhost:8000/api/v1/userprofiles/

from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')


urlpatterns = [
    # Currently only takes GET requests
    path('', AllUserProfiles.as_view(), name='all_user_profiles'),
    path('<int_or_str:id>/', SelectUserProfiles.as_view(), name='selected_user_profile')
]