CREATE TABLE sensors_pressure (
  id           SERIAL                   NOT NULL,
  reading_time timestamp with time zone NOT NULL DEFAULT now(),
  pressure     decimal                  NOT NULL,
  temperature  decimal                  NOT NULL,
  altitude     decimal                  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_humidity (
  id           SERIAL                   NOT NULL,
  reading_time timestamp with time zone NOT NULL DEFAULT now(),
  humidity     decimal                  NOT NULL,
  temperature  decimal                  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_temperature (
  id           SERIAL                   NOT NULL,
  reading_time timestamp with time zone NOT NULL DEFAULT now(),
  temperature  decimal   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_wind (
  id           SERIAL                    NOT NULL,
  reading_time timestamp with time zone  NOT NULL DEFAULT now(),
  speed        decimal                   NOT NULL,
  rpm          integer                   NOT NULL,
  hertz        integer                   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_precipitation (
  id           SERIAL                    NOT NULL,
  reading_time timestamp with time zone  NOT NULL DEFAULT now(),
  total        decimal                   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_direction (
  id           SERIAL                    NOT NULL,
  reading_time timestamp with time zone  NOT NULL DEFAULT now(),
  direction    integer                   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE weather_log (
  id             SERIAL                    NOT NULL,
  reading_time   timestamp with time zone  NOT NULL DEFAULT now(),
  temperature    decimal                   NOT NULL,
  pressure       decimal                   NOT NULL,
  humidity       decimal                   NOT NULL,
  precipitation  decimal                   NOT NULL,
  wind_avg       decimal                   NOT NULL,
  wind_gust      decimal                   NOT NULL,
  wind_direction integer                   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE weather_sent (
  id             SERIAL                    NOT NULL,
  sent_time      timestamp with time zone  NOT NULL DEFAULT now(),
  last_sent_id   integer                   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE motion_log (
  id               SERIAL NOT NULL,
  camera           integer,
  filename         text not null,
  frame            integer,
  file_type        integer,
  time_stamp       timestamp with time zone,
  event_time_stamp timestamp with time zone,
  PRIMARY KEY (id)
);

CREATE OR REPLACE VIEW logger_pressure AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    avg(pressure)
  FROM sensors_pressure
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_temperature AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    avg(temperature)
  FROM sensors_temperature
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_humidity AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    avg(humidity)
  FROM sensors_humidity
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_precipitation AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    sum(total)
  FROM sensors_precipitation
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_wind AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    avg(speed),
    max(speed)
  FROM sensors_wind
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_direction AS
  SELECT
    EXTRACT(hour from reading_time) AS hour,
    EXTRACT(minute from reading_time) AS minute,
    avg(direction)
  FROM sensors_direction
  GROUP BY 1, 2
  ORDER BY 1 DESC, 2 DESC;

CREATE OR REPLACE VIEW logger_all AS
  SELECT
    p.hour,
    p.minute,
    round(p.avg, 2) as pressure,
    round(t.avg, 2) as temperature,
    round(h.avg, 2) as humidity,
    round(r.sum, 2) as precipitation,
    round(w.avg, 2) as wind_avg,
    round(w.max, 2) as wind_gust,
    round(d.avg) as wind_direction
  FROM logger_pressure p
    INNER JOIN logger_temperature t
      ON p.hour = t.hour AND p.minute = t.minute
    INNER JOIN logger_humidity h
      ON p.hour = h.hour AND p.minute = h.minute
    INNER JOIN logger_precipitation r
      ON p.hour = r.hour AND p.minute = r.minute
    INNER JOIN logger_wind w
      ON p.hour = w.hour AND p.minute = w.minute
    INNER JOIN logger_direction d
      ON p.hour = d.hour AND p.minute = d.minute
  ORDER BY 1 DESC, 2 DESC
  LIMIT 60;


DROP TRIGGER IF EXISTS trgr_sensor_pressure_change ON sensors_pressure;
DROP TRIGGER IF EXISTS trgr_sensor_humidity_change ON sensors_humidity;
DROP TRIGGER IF EXISTS trgr_sensor_temperature_change ON sensors_temperature;
DROP TRIGGER IF EXISTS trgr_sensor_wind_change ON sensors_wind;
DROP TRIGGER IF EXISTS trgr_sensor_precipitation_change ON sensors_precipitation;
DROP TRIGGER IF EXISTS trgr_sensor_direction_change ON sensors_direction;

DROP FUNCTION IF EXISTS notify_pressure();
DROP FUNCTION IF EXISTS notify_humidity();
DROP FUNCTION IF EXISTS notify_temperature();
DROP FUNCTION IF EXISTS notify_wind();
DROP FUNCTION IF EXISTS notify_precipitation();
DROP FUNCTION IF EXISTS notify_direction();

CREATE FUNCTION notify_pressure () RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('sensor_change',  'pressure:' || NEW.pressure::integer);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION notify_humidity () RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('sensor_change',  'humidity:' || round(NEW.humidity, 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION notify_temperature () RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('sensor_change',  'temperature:' || round(NEW.temperature, 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION notify_wind () RETURNS trigger AS $$
DECLARE
  gust decimal;
BEGIN
  SELECT INTO gust max(speed) FROM sensors_wind;
  PERFORM pg_notify('sensor_change',  'wind:' || NEW.speed || ',' || gust);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION notify_precipitation () RETURNS trigger AS $$
DECLARE
  sumarized decimal;
BEGIN
  SELECT INTO sumarized COALESCE(sum(total), 0.0) FROM sensors_precipitation;
  PERFORM pg_notify('sensor_change',  'precipitation:' || sumarized);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION notify_direction () RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('sensor_change',  'direction:' || NEW.direction);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trgr_sensor_pressure_change
  AFTER INSERT ON
    sensors_pressure
  FOR EACH ROW EXECUTE PROCEDURE
    notify_pressure();

CREATE TRIGGER trgr_sensor_humidity_change
  AFTER INSERT ON
    sensors_humidity
  FOR EACH ROW EXECUTE PROCEDURE
    notify_humidity();

CREATE TRIGGER trgr_sensor_temperature_change
  AFTER INSERT ON
    sensors_temperature
  FOR EACH ROW EXECUTE PROCEDURE
    notify_temperature();

CREATE TRIGGER trgr_sensor_wind_change
  AFTER INSERT ON
    sensors_wind
  FOR EACH ROW EXECUTE PROCEDURE
    notify_wind();

CREATE TRIGGER trgr_sensor_precipitation_change
  AFTER INSERT ON
    sensors_precipitation
  FOR EACH ROW EXECUTE PROCEDURE
    notify_precipitation();

CREATE TRIGGER trgr_sensor_direction_change
  AFTER INSERT ON
    sensors_direction
  FOR EACH ROW EXECUTE PROCEDURE
    notify_direction();
