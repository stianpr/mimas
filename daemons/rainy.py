#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorPrecipitation
from sensors.TX11 import Sensor


conf = dict(
    model=SensorPrecipitation,
    sensor=Sensor(gpio=12),
    interval=2.0
)

with Daemon(**conf) as daemon:
    daemon.run()
