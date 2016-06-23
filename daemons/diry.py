#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorDirection
from sensors.QSFX import Sensor


conf = dict(
    model=SensorDirection,
    sensor=Sensor(channel=0, volts=5.0),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
