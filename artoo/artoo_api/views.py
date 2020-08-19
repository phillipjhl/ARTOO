from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Sensors': '/devices'
    }
    
    return Response(api_urls)

@api_view(['GET', 'POST', 'UPDATE', 'DELETE'])
def devices(request):

    return Response('data')