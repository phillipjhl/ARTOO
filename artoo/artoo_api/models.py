from django.db import models

class Location(models.Model):
    location_name = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.location_name

class DeviceType(models.Model):
    name = models.CharField(max_length=60)
    model_num = models.CharField(max_length=60, null=True)
    wifi_enabled = models.BooleanField()
    z_wave_enabled = models.BooleanField()

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Device(models.Model):
    name = models.CharField(max_length=60)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    device_type_id = models.ForeignKey(DeviceType, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SensorType(models.Model):
    name = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Sensor(models.Model):
    name = models.CharField(max_length=60)
    device_id = models.ForeignKey(Device, on_delete=models.CASCADE)
    sensor_type_id = models.ForeignKey(SensorType, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SensorData(models.Model):
    name = models.CharField(max_length=60)
    sensor_id = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    values = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Hostname(models.Model):
    ip_address = models.CharField(max_length=45)
    hostname = models.CharField(max_length=45, null=True)
    device_id = models.OneToOneField(Device, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.hostname
