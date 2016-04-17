#!/usr/bin/env python
from __future__ import unicode_literals

from lib.DS18B20 import DS18B20


sensor = DS18B20()
temperature = sensor.get_temperature()

print('{}C'.format(temperature))
