#!/usr/bin/env python
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
