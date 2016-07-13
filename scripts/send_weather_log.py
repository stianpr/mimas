#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import requests
import sys
filepath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.realpath(filepath + '/..'))

from database import models, session


ENDPOINT_URL = 'http://nilsbu.no/api/weather/'


def get_last_sent():
    model = models.WeatherSent
    return session.query(model).order_by(model.last_sent_id.desc()).first()


def get_weather_data():
    last_sent = get_last_sent()
    last_sent_id = last_sent.last_sent_id if last_sent else 0
    model = models.WeatherLog
    return session.query(model).filter(model.id > str(last_sent_id)).all()


def main():
    data = []
    weather_sent = models.WeatherSent()

    for weather in get_weather_data():
        data.append(weather.to_dict())
        last_id = weather.id

    response = requests.post(ENDPOINT_URL, json=data)
    if response.status_code == requests.codes.created:
        weather_sent.last_sent_id = last_id
        session.add(weather_sent)
        session.commit()

        print "ok! weathers sent and last id stored"
    else:
        response.raise_for_status()


if __name__ == "__main__":
    main()
