import spidev
import time

from database.models import SensorDirection


class Sensor(object):
    """Sensor for Wind Direction.

    0-360 degrees
    0.4v = 0 degrees north
    16 directions

    Specification:
    http://chinaplccenter.com/support/pdf/Sensor/QS-FX-en.pdf
    """
    def __init__(self, channel=0, record_time=1.0, volts=5.0):
        self.channel = channel
        self.record_time = record_time
        self.volts = self.volts

        self.spi = spidev.SpiDev()
        self.spi.open(0, 0)

    def __enter__(self):
        return self

    def __exit__(self, *args, **kwargs):
        self.stop()

    def stop(self):
        self.spi.close()

    def get_value(self):
        """Return SPI data from MCP3008 chip, 8 possible adc's (0 thru 7)"""
        if self.channel > 7 or self.channel < 0:
            return -1

        r = self.spi.xfer2([1, 8 + self.channel << 4, 0])
        return ((r[1] & 3) << 8) + r[2]

    def get_readings(self):
        time.sleep(self.record_time)

        value = self.get_value()
        volts = (value * self.volts) / 1024
        direction = (volts - 0.4) / 16 * 360

        return SensorDirection(direction=direction)
