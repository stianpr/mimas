import time

from database import session


class Daemon(object):
    MAX_READINGS = 120

    @property
    def total(self):
        return len(session.query(self.model).all())

    def __init__(self, model, sensor, interval):
        self.model = model
        self.sensor = sensor
        self.interval = interval

        self.always_delete = False

    def __enter__(self):
        return self

    def __exit__(self, *args, **kwargs):
        self.sensor.stop()

    def cleanup(self):
        oldest = session.query(
            self.model
        ).order_by(self.model.reading_time).first()

        session.delete(oldest)
        session.commit()

    def create(self, *kwargs):
        data = self.model(**kwargs)
        session.add(data)
        session.commit()

    def run(self):
        while True:
            readings = self.sensor.get_readings()

            if self.always_delete or self.total >= 120:
                self.cleanup()
                self.always_delete = True

            self.create(**readings)

            if self.interval:
                time.sleep(self.interval)
