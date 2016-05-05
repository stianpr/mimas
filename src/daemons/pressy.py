#!/usr/bin/env python
from daemons.daemon import Daemon
from database.models import SensorPressure
from lib.BMP280 import Sensor


conf = dict(
    model=SensorPressure,
    sensor=Sensor(address=0x76),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
