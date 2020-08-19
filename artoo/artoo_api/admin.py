from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Device)
admin.site.register(DeviceType)
admin.site.register(Sensor)
admin.site.register(SensorType)
admin.site.register(SensorData)
admin.site.register(Location)
admin.site.register(Hostname)