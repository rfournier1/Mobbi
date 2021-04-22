from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Setting, MediaSetting

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'last_name', 'first_name', 'email']

class SettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Setting
        fields = ['id','key','value','block']

class MediaSettingSerializer(serializers.ModelSerializer):
    media_url = serializers.ReadOnlyField()

    class Meta:
        model = MediaSetting
        fields = ('id', 'media_url', 'media')