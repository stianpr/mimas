#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorPressure
from sensors.BMP280 import Sensor


conf = dict(
    model=SensorPressure,
    sensor=Sensor(address=0x76),
    interval=2.0
)

with Daemon(**conf) as daemon:
    daemon.run()
