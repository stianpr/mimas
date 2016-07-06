#!/bin/sh

psql mimas <<SQL
  INSERT INTO weather_log (
    temperature,
    pressure,
    humidity,
    precipitation,
    wind_avg,
    wind_gust,
    wind_direction
  )
  VALUES (
    SELECT
      now() - interval '1 minute',
      temperature,
      pressure,
      humidity,
      precipitation,
      wind_avg,
      wind_gust,
      wind_direction
    FROM logger_all
    OFFSET 1 LIMIT 1
  )
SQL
