from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseForbidden, JsonResponse
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import os
import json

from backend import settings

from rest_framework import generics, permissions


from .models import Setting, MediaSetting
from .serializers import *

# Create your views here.
class UserInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        user = UserSerializer(request.user).data
        return JsonResponse(user, safe=False)
        
class SettingsList(generics.ListAPIView):
    queryset = Setting.objects.all()
    permission_classes = (permissions.AllowAny, )
    serializer_class = SettingSerializer
    lookup_field = 'id'

class SettingsSearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, *args, **kwargs):
        settings =  Setting.objects.filter(block=kwargs["block"])
        if(settings.first() is None):
            return HttpResponseNotFound()
        response = {}
        for setting in SettingSerializer(settings, many=True).data:
            value = None
            try:
                value = json.loads(setting['value'])
            except Exception as e:
                print("exception on block "+kwargs["block"])
                print(setting['value'])
                print(e)
                value = setting['value']
            response[setting['key']] = value
        
        return JsonResponse(response, safe=False)

class SettingsSearchKeyView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, *args, **kwargs):
        settings =  Setting.objects.filter(block=kwargs["block"], key=kwargs["key"])
        if(settings.first() is None):
            return HttpResponseNotFound()
        response = {}
        try:
            response = json.loads(SettingSerializer(settings.first()).data['value'])
        except Exception as e:
            print("exception on block "+kwargs["block"])
            print(SettingSerializer(settings.first()).data['value'])
            print(e)
            response = SettingSerializer(settings.first()).data['value']
        
        return JsonResponse(response, safe=False)

class SettingsUpdateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        settings = json.loads(request.body)
        for setting in settings:
            objectSetting = Setting.objects.update_or_create(
                block=kwargs['block'], key=setting,
                defaults={'value': json.dumps(settings[setting])})
            
        return(HttpResponse(status= 200))
        
class SettingsUpdateMultipleView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        blocks = json.loads(request.body)
        for block in blocks:
            settings = blocks[block]
            for setting in settings:
                objectSetting = Setting.objects.update_or_create(
                    block=block, key=setting,
                    defaults={'value': json.dumps(settings[setting])})
            
        return(HttpResponse(status= 200))

class FrontendFileUploadView(APIView):
    parser_class = (FileUploadParser,)
    queryset = MediaSetting.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, *args, **kwargs):

      file_serializer = MediaSettingSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MediaList(generics.ListAPIView):
    # voir toutes les photos
    queryset =  queryset = MediaSetting.objects.all()
    serializer_class = MediaSettingSerializer
    permission_classes = (permissions.IsAuthenticated, )
    lookup_field = 'id'

class MediaSettingDestroy(generics.DestroyAPIView):
    queryset = MediaSetting.objects.all()
    serializer_class = MediaSettingSerializer
    permission_classes = (permissions.IsAuthenticated, )
    lookup_field = 'id'