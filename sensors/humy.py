#!/usr/bin/env python
from __future__ import unicode_literals

from lib.DHT22 import DHT22


sensor = DHT22()
humidity, temperature = sensor.get_readings()

print('{}% / {}C'.format(humidity, temperature))
