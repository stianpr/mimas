#!/usr/bin/env python
from sqlalchemy.sql import func

from database import models, session


LIMIT = 30


def get_temperature():
    model = models.SensorTemperature
    return (
        session.query(func.avg(model.temperature))
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0][0]


def get_pressure():
    model = models.SensorPressure
    return (
        session
        .query(func.avg(model.pressure))
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0][0]


def get_humidity():
    model = models.SensorHumidity
    return (
        session
        .query(func.avg(model.humidity))
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0][0]


def get_precipitation():
    model = models.SensorPrecipitation
    return (
        session
        .query(func.sum(model.total))
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0][0]


def get_wind():
    model = models.SensorWind
    data = (
        session
        .query(
            func.avg(model.speed),
            func.max(model.speed),
        )
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0]
    return (data[0], data[1])


def get_direction():
    model = models.SensorDirection
    return (
        session
        .query(func.avg(model.direction))
        .group_by(model.reading_time)
        .order_by(model.reading_time.desc())
        .limit(LIMIT)
        .all()
    )[0][0]


log = models.WeatherLog(
    temperature=round(get_temperature()),
    pressure=round(get_pressure()),
    humidity=round(get_humidity()),
    precipitation=get_precipitation(),
    wind_direction=get_direction()
)
winds = get_wind()
log.wind_avg = round(winds[0])
log.wind_gust = round(get_wind())

session.add(log)
session.commit()
