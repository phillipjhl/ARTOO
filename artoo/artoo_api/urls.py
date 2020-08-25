from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'devices', views.DeviceViewSet, basename='device')
router.register(r'sensors/data', views.SensorDataViewSet, basename='sensor data')
router.register(r'sensors', views.SensorViewSet, basename='sensor')

urlpatterns = router.urls
