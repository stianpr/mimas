#!/usr/bin/env python
from __future__ import unicode_literals

import Adafruit_BMP.BMP280 as BMP280


sensor = BMP280.BMP280(address=0x76)
temp = sensor.read_temperature()
pressure = sensor.read_pressure() / 100
altitude = sensor.read_altitude()

print('{}hPA / {}C / {}m'.format(round(pressure), temp, round(altitude)))
