#!/usr/bin/env python
from __future__ import unicode_literals

import Adafruit_BMP.BMP280 as BMP280
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import models
from sensors.lib.DHT22.gpio import Sensor as DHT22
from sensors.lib.DS18B20 import DS18B20


engine = create_engine('postgresql:///mimas')
models.Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


def log_pressy():
    sensor = BMP280.BMP280(address=0x76)
    temp = sensor.read_temperature()
    pressure = sensor.read_pressure() / 100
    altitude = sensor.read_altitude()

    pressy = models.SensorPressy(
        pressure=pressure,
        temperature=temp,
        altitude='{0:.2f}'.format(altitude)
    )
    session.add(pressy)
    session.commit()


def log_humy():
    sensor = DHT22(17, LED=None, power=None)
    humidity, temperature = sensor.get_readings()

    humy = models.SensorHumy(
        humidity=humidity or 0,
        temperature=temperature or 0
    )
    session.add(humy)
    session.commit()


def log_tempy():
    sensor = DS18B20()
    temperature = sensor.get_temperature()

    tempy = models.SensorTempy(temperature=temperature)
    session.add(tempy)
    session.commit()


if __name__ == '__main__':
    log_pressy()
    log_humy()
    log_tempy()
