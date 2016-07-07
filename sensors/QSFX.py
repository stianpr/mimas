import spidev

from database.models import SensorDirection


class Sensor(object):
    """Sensor for Wind Direction.

    0-360 degrees
    0.4v = 0 degrees north
    16 directions

    Specification:
    http://chinaplccenter.com/support/pdf/Sensor/QS-FX-en.pdf
    """
    def __init__(self, channel=0, volts=2.0):
        self.channel = channel
        self.volts = volts

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
        r = self.spi.xfer2([1, 8 + self.channel << 4, 0])
        return ((r[1] & 3) << 8) + r[2]

    def get_readings(self):
        value = self.get_value()
        volts = (value * self.volts) / 1024
        direction = (volts - 0.389) / 16 * 360 if volts > 0 else 0

        return SensorDirection(direction=max(0, min(direction * 10, 360)))
