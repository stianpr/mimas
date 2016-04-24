#!/usr/bin/env python
from __future__ import unicode_literals

from lib.QSFS import Sensor


with Sensor(gpio=18, record_time=0.2) as sensor:
    speed, rpm, count = sensor.get_readings()

print('{:.2f} / {:.0f}Hz / {:.0f}rpm'.format(speed, rpm, count))
