#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorWind
from sensors.QSFS import Sensor


conf = dict(
    model=SensorWind,
    sensor=Sensor(gpio=18, record_time=2.0),
    interval=False
)

with Daemon(**conf) as daemon:
    daemon.run()
