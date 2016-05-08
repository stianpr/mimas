#!/usr/bin/env python
import os
import sys
sys.path.append(os.path.abspath('../'))

from daemons.daemon import Daemon
from database.models import SensorPressure
from sensors.BMP280 import Sensor


conf = dict(
    model=SensorPressure,
    sensor=Sensor(address=0x76),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
