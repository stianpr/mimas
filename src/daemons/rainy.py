#!/usr/bin/env python
from daemons.daemon import Daemon
from database.models import SensorPrecipitation
from sensors.TX11 import Sensor


conf = dict(
    model=SensorPrecipitation,
    sensor=Sensor(gpio=12),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
