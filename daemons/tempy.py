#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorTemperature
from sensors.DS18B20 import Sensor


conf = dict(
    model=SensorTemperature,
    sensor=Sensor(),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
