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


CREATE FUNCTION notify_trigger () RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('sensor_change', TG_TABLE_NAME || ',id,' || NEW.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trgr_sensor_pressure_change
  AFTER INSERT ON
    sensors_pressure
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();

CREATE TRIGGER trgr_sensor_humidity_change
  AFTER INSERT ON
    sensors_humidity
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();

CREATE TRIGGER trgr_sensor_temperature_change
  AFTER INSERT ON
    sensors_temperature
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();

CREATE TRIGGER trgr_sensor_wind_change
  AFTER INSERT ON
    sensors_wind
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();

CREATE TRIGGER trgr_sensor_precipitation_change
  AFTER INSERT ON
    sensors_precipitation
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();

CREATE TRIGGER trgr_sensor_direction_change
  AFTER INSERT ON
    sensors_direction
  FOR EACH ROW EXECUTE PROCEDURE
    notify_trigger();
