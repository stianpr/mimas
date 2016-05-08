import datetime

from sqlalchemy import Column, DateTime, Float, Integer
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class BaseSensor(object):
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)


class SensorPressure(BaseSensor, Base):
    __tablename__ = 'sensors_pressure'
    pressure = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)
    altitude = Column(Float, nullable=False)

    def __str__(self):
        return '{}hPA / {}C / {}m'.format(
            self.pressure, self.temperature, self.altitude)


class SensorHumidity(BaseSensor, Base):
    __tablename__ = 'sensors_humidity'
    humidity = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)

    def __str__(self):
        return '{}% / {}C'.format(self.humidity, self.temperature)


class SensorTemperature(BaseSensor, Base):
    __tablename__ = 'sensors_temperature'
    temperature = Column(Float, nullable=False)

    def __str__(self):
        return '{}C'.format(self.temperature)


class SensorWind(BaseSensor, Base):
    __tablename__ = 'sensors_wind'
    speed = Column(Float, nullable=False)
    rpm = Column(Integer, nullable=False)
    hertz = Column(Float, nullable=False)

    def __str__(self):
        return '{:.2f}m/s / {:.0f}rpm / {:.0f}Hz'.format(
            self.speed, self.rpm, self.hertz)


class SensorPrecipitation(BaseSensor, Base):
    __tablename__ = 'sensors_precipitation'
    total = Column(Float, nullable=False)

    def __str__(self):
        return '{}mm'.format(self.total)


class WeatherLog(BaseSensor, Base):
    __tablename__ = 'weather_log'
    temperature = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    precipitation = Column(Float, nullable=False)
    wind_avg = Column(Float, nullable=False)
    wind_gust = Column(Float, nullable=False)
    wind_direction = Column(Integer, nullable=False)
