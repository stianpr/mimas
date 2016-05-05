#!/usr/bin/env python
from __future__ import unicode_literals

from lib.DHT22.gpio import Sensor


with Sensor(gpio=17, LED=None, power=None) as sensor:
    humidity, temperature = sensor.get_readings()

if humidity:
    print('{}% / {}C'.format(humidity, temperature))
else:
    print('-')
