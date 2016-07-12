#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import requests
from datetime import datetime


DIR = '/home/pi/captures'
ENDPOINT_URL = 'http://nilsbu.no/api/motion-pictures/'


def post_data(data, filepath):
    return requests.post(
        ENDPOINT_URL,
        data=data,
        files={'picture': open(filepath, 'rb')}
    )


def get_picture_data(filepath):
    filename = os.path.basename(filepath)
    name, ext = os.path.splitext(filename)
    camera, timestamp, frame = name.split('-')
    created = datetime.strptime(timestamp, '%Y%m%d%H%M%S').isoformat()
    return {
        'camera': camera,
        'frame': frame,
        'created': created.replace('T', ' ')
    }


def main():
    for picture in os.listdir(DIR):
        filepath = os.path.join(DIR, picture)
        data = get_picture_data(filepath=filepath)

        r = post_data(data=data, filepath=filepath)
        if r.status_code == requests.codes.created:
            print "ok! removing file"
            os.remove(filepath)
        else:
            r.raise_for_status()


if __name__ == "__main__":
    main()
