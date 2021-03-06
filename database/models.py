import datetime

from sqlalchemy import Column, DateTime, Float, Integer
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class BaseSensor(object):
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.now)


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
    hertz = Column(Integer, nullable=False)

    def __str__(self):
        return '{:.2f}m/s / {:.0f}rpm / {:.0f}Hz'.format(
            self.speed, self.rpm, self.hertz)


class SensorPrecipitation(BaseSensor, Base):
    __tablename__ = 'sensors_precipitation'
    total = Column(Float, nullable=False)

    def __str__(self):
        return '{}mm'.format(self.total)


class SensorDirection(BaseSensor, Base):
    __tablename__ = 'sensors_direction'
    direction = Column(Integer, nullable=False)

    def __str__(self):
        return '{} degress'.format(self.direction)


class WeatherLog(BaseSensor, Base):
    __tablename__ = 'weather_log'
    temperature = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    precipitation = Column(Float, nullable=False)
    wind_avg = Column(Float, nullable=False)
    wind_gust = Column(Float, nullable=False)
    wind_direction = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'reading_date': self.reading_time.isoformat(),
            'outdoor_humidity': self.humidity,
            'outdoor_temp': self.temperature,
            'abs_pressure': self.pressure,
            'wind_avarage_ms': self.wind_avg,
            'wind_gust_ms': self.wind_gust,
            'wind_direction': self.wind_direction,
            'rain_total': self.precipitation,
        }


class WeatherSent(Base):
    __tablename__ = 'weather_sent'
    id = Column(Integer, primary_key=True)
    sent_time = Column(DateTime, default=datetime.datetime.now)
    last_sent_id = Column(Integer, nullable=False)
