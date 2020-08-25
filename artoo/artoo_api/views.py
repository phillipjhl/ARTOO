from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

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

class SensorViewSet(viewsets.ModelViewSet):
    """
    CRUD on Sensors
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

class SensorDataViewSet(viewsets.ModelViewSet):
    """
    CRUD on SensorData
    """
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer