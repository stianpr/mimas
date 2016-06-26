#!/usr/bin/env python
import os
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from daemons.daemon import Daemon
from database.models import SensorHumidity
from sensors.DHT22.gpio import Sensor


conf = dict(
    model=SensorHumidity,
    sensor=Sensor(gpio=17, LED=None, power=None),
    interval=2.0
)

with Daemon(**conf) as daemon:
    daemon.run()
