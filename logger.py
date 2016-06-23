#!/usr/bin/env python
from sqlalchemy.sql import func

from database import models, session


LIMIT = 60


def get_temperature():
    model = models.SensorTemperature
    return (
        session
        .query(func.avg(model.temperature))
        .order_by(model.reading_time)
        .limit(LIMIT)
    )['avg']


def get_pressure():
    model = models.SensorPressure
    return (
        session
        .query(func.avg(model.pressure))
        .order_by(model.reading_time)
        .limit(LIMIT)
    )['avg']


def get_humidity():
    model = models.SensorHumidity
    return (
        session
        .query(func.avg(model.humidity))
        .order_by(model.reading_time)
        .limit(LIMIT)
    )['avg']


def get_precipitation():
    model = models.SensorPrecipitation
    return (
        session
        .query(func.sum(model.total))
        .order_by(model.reading_time)
        .limit(LIMIT)
    )['sum']


def get_wind():
    model = models.SensorWind
    data = (
        session
        .query(
            func.avg(model.total),
            func.max(model.total),
        )
        .order_by(model.reading_time)
        .limit(LIMIT)
    )
    return (data['avg'], data['max'])


def get_direction():
    model = models.SensorDirection
    return (
        session
        .query(func.avg(model.direction))
        .order_by(model.reading_time)
        .limit(LIMIT)
    )['avg']


log = models.WeatherLog(
    temperature=get_temperature(),
    pressure=get_pressure(),
    humidity=get_humidity(),
    precipitation=get_precipitation(),
    wind_direction=get_direction()
)
log.wind_avg, log.wind_gust = get_wind()

session.add(log)
session.commit()
