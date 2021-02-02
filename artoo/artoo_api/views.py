from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import DjangoModelPermissions

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

from .serializers import DeviceSerializer, SensorSerializer, SensorDataSerializer
from .models import Device, Sensor, SensorData

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Sensors': '/devices'
    }
    
    return Response(api_urls)

class DeviceViewSet(viewsets.ModelViewSet):
    """
    CRUD on devices
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

class SensorViewSet(viewsets.ModelViewSet):
    """
    CRUD on Sensors
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

class SensorDataViewSet(viewsets.ModelViewSet):
    """
    CRUD on SensorData
    """

    permission_classes = [TokenHasReadWriteScope]

    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

    # @action(detail=False)
    # def recent_data(self, request):
    #     recent_data = SensorData.objects.all()

    #     page = self.paginate_queryset(recent_data)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(recent_data, many=True)
    #     return Response(serializer.data)