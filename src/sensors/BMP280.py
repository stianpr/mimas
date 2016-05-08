import Adafruit_BMP.BMP280 as BMP280

from database.models import SensorPressure


class Sensor(object):
    def __init__(self, address=0x76):
        self.sensor = BMP280.BMP280(address=address)

    def get_readings(self):
        return SensorPressure(
            pressure='{0:.3f}'.format(self.sensor.read_pressure() / 100.0),
            temperature='{0:.3f}'.format(self.sensor.read_temperature()),
            altitude='{0:.1f}'.format(self.sensor.read_altitude()),
        )
