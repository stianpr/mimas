import datetime

from sqlalchemy import Column, DateTime, Float, Integer
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class BaseSensor(Base):
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)


class SensorPressy(BaseSensor):
    __tablename__ = 'sensors_pressy'
    pressure = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)
    altitude = Column(Float, nullable=False)


class SensorHumy(BaseSensor):
    __tablename__ = 'sensors_humy'
    humidity = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)


class SensorTempy(BaseSensor):
    __tablename__ = 'sensors_tempy'
    temperature = Column(Float, nullable=False)


class SensorWind(BaseSensor):
    __tablename__ = 'sensor_wind'
    speed = Column(Float, nullable=False)
    rpm = Column(Integer, nullable=False)
    hertz = Column(Float, nullable=False)


class SensorRain(BaseSensor):
    __tablename__ = 'sensors_rain'
    total = Column(Float, nullable=False)
