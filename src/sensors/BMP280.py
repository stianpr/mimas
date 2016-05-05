import Adafruit_BMP.BMP280 as BMP280

from database.models import SensorPressure


class Sensor(object):
    def __init__(self, address=0x76):
        self.sensor = BMP280.BMP280(address=address)

    def get_readings(self):
        return SensorPressure(
            pressure=self.sensor.read_pressure() / 100,
            temperature=self.sensor.read_temperature(),
            altitude=self.sensor.read_altitude(),
        )
