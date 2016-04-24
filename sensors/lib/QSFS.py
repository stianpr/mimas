import time
import pigpio


PULSE_SPEED = 12  # Pulses pr second (Hz) = 1m/s


class Sensor(object):
    """Sensor for Wind Speed Anemometer.

    Specification:
    http://chinaplccenter.com/support/pdf/Sensor/QS-FS-en.pdf
    """
    def __init__(self, gpio=18, record_time=1.0):
        self.pi = pigpio.pi()
        self.cb = self.pi.callback(gpio)

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

        speed = self.count / (PULSE_SPEED * self.record_time)
        rpm = speed * 60

        self.reset_count()

        return (speed, rpm, self.count)
