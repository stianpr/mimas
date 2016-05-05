#!/usr/bin/env python
from __future__ import unicode_literals

from lib.QSFS import Sensor


with Sensor(gpio=18, record_time=0.5) as sensor:
    wind = sensor.get_readings()

print(str(wind))
