#!/usr/bin/env python
from __future__ import unicode_literals

from lib.QSFS import Sensor


with Sensor(gpio=18, record_time=0.5) as sensor:
    speed, rpm, count = sensor.get_readings()

print('{:.2f} / {:.0f}rpm / {:.0f}Hz'.format(speed, rpm, count))
