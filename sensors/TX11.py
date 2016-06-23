import pigpio

from database.models import SensorPrecipitation


RAIN_PULSE = 0.2794  # mm / pulse


class Sensor(object):
    def __init__(self, gpio=12):
        self.pi = pigpio.pi()
        # Put power on the internal resistor
        self.pi.set_pull_up_down(gpio, pigpio.PUD_UP)
        self.pi.set_glitch_filter(gpio, 300)

        self.cb = self.pi.callback(gpio, pigpio.FALLING_EDGE)
        self.count = self.cb.tally()

    def __enter__(self):
        return self

    def __exit__(self, *args, **kwargs):
        self.stop()

    def set_count(self):
        self.count = self.cb.tally()

    def reset_count(self):
        self.cb.reset_tally()

    def stop(self):
        self.cb.cancel()
        self.pi.stop()

    def get_readings(self):
        self.set_count()

        total = self.count * RAIN_PULSE
        precipitation = SensorPrecipitation(total='{0:.3f}'.format(total))

        self.reset_count()

        return precipitation
