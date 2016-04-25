#!/usr/bin/env python
from __future__ import unicode_literals

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import models
from sensors.lib.QSFS import Sensor


engine = create_engine('postgresql:///mimas')
models.Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


always_delete = False
sensor = Sensor(gpio=18, record_time=1.0)


def delete_oldest():
    oldest = session.query(models.SensorWind).order_by('created').limit(1)
    session.delete(oldest)
    session.commit()


def create_reading(speed, rpm, hertz):
    data = models.SensorWind(
        speed=speed,
        rpm=rpm,
        hertz=hertz
    )
    session.add(data)
    session.commit()


def num_readings():
    return len(session.query(models.SensorWind).all())


while True:
    speed, rpm, hertz = sensor.get_readings()

    if always_delete or num_readings() >= 120:
        delete_oldest()
        always_delete = True

    create_reading(speed, rpm, hertz)


sensor.stop()
