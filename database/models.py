import datetime

from sqlalchemy import Column, DateTime, Float, Integer
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class SensorPressy(Base):
    __tablename__ = 'sensor_pressy'
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)
    pressure = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)
    altitude = Column(Float, nullable=False)


class SensorHumy(Base):
    __tablename__ = 'sensor_humy'
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)
    humidity = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)


class SensorTempy(Base):
    __tablename__ = 'sensor_tempy'
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)
    temperature = Column(Float, nullable=False)


class SensorWind(Base):
    __tablename__ = 'sensor_wind'
    id = Column(Integer, primary_key=True)
    reading_time = Column(DateTime, default=datetime.datetime.utcnow)
    speed = Column(Float, nullable=False)
    rpm = Column(Integer, nullable=False)
    hertz = Column(Float, nullable=False)
