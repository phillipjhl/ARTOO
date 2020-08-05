#!/usr/bin/env python3

import board
import busio
import time
import adafruit_dht

class DHT_SENSOR:
    def __init__(self, sensor_type = "DHT11", temp_format = "F"):
        self.sensor_type = sensor_type
        self.temp_format = temp_format

        if self.sensor_type == "DHT22":
            self.dht = adafruit_dht.DHT22(board.D17)
        elif self.sensor_type == "DHT11":
            self.dht = adafruit_dht.DHT11(board.D17)
        else:
            raise Exception("Unavailable sensor_type.")

    def read_sensor(self):
        try:
            temp_c = self.dht.temperature
            temp_f = temp_c * (9/5) + 32
            hum = self.dht.humidity
            print(
                "Temp: {:.1f}F / {:.1f}C     Humidity: {}% ".format(temp_f, temp_c, hum))
            if self.temp_format == "C":
                return [temp_c, hum]
            else:
                return [temp_f, hum]
            
        except RuntimeError as error:
            print(error.args[0])

# sensor = DHT_SENSOR("DHT22")

# data = sensor.read_sensor()

# print(data)