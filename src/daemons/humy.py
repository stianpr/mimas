#!/usr/bin/env python
from daemons.daemon import Daemon
from database.models import SensorHumidity
from lib.DHT22.gpio import Sensor


conf = dict(
    model=SensorHumidity,
    sensor=Sensor(gpio=17, LED=None, power=None),
    interval=1.0
)

with Daemon(**conf) as daemon:
    daemon.run()
