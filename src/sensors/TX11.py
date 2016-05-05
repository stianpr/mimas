import time
import pigpio


RAIN_PULSE = 0.2794  # mm / pulse


class Sensor(object):
    def __init__(self, gpio=12, record_time=1.0):
        self.pi = pigpio.pi()
        # Put power on the internal resistor
        self.pi.set_pull_up_down(gpio, pigpio.PUD_UP)
        self.pi.set_glitch_filter(gpio, 300)

        self.cb = self.pi.callback(gpio, pigpio.FALLING_EDGE)

        self.record_time = record_time
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
        time.sleep(self.record_time)

        self.set_count()

        print("RAIN: {} {}".format(self.count * RAIN_PULSE, self.count))

        # self.reset_count()


with Sensor() as sensor:
    while True:
        sensor.get_readings()
