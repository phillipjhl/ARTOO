from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Device)
admin.site.register(models.DeviceType)
admin.site.register(models.Sensor)
admin.site.register(models.SensorType)
admin.site.register(models.SensorData)
admin.site.register(models.Location)
admin.site.register(models.Hostname)