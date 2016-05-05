#!/usr/bin/env python
from daemons.daemon import Daemon
from database.models import SensorWind
from sensors.QSFS import Sensor


conf = dict(
    model=SensorWind,
    sensor=Sensor(gpio=18, record_time=1.0),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
