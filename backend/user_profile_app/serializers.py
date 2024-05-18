from rest_framework import serializers
from app_user_app.models import AppUser
from .models import UserProfile
from app_user_app.serializers import AppUserSerializer

class UserProfileSerializer(serializers.ModelSerializer):

    account = AppUserSerializer(many=False)

    class Meta:
        model = UserProfile
        fields = ('street_name', 'street_number', 'zip_code', 'city','account')


    def create(self, validated_data):

        account_data = validated_data.get('account')
        account = AppUser.objects.create(**account_data)
    
        validated_data["account"] = account
        new_user_profile = UserProfile.objects.create(**validated_data)

        return new_user_profile