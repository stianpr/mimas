#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests

from database import models, session


ENDPOINT_URL = 'http://nilsbu.no/api/weather/'


def get_last_sent():
    model = models.WeatherSent
    return session.query(model).order_by(model.last_sent_id).desc().first()


def get_weather_data():
    last_sent = get_last_sent()
    model = models.WeatherLog
    return session.query(model).where(
        model.id > last_sent.last_sent_id
    ).order_by(model.id).all()


def main():
    data = []
    for weather in get_weather_data():
        data.append(weather.to_dict())

    response = requests.post(ENDPOINT_URL, data=data)
    if response.status_code == requests.codes.created:
        print "ok! weathers stored"
    else:
        response.raise_for_status()


if __name__ == "__main__":
    main()
