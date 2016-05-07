CREATE TABLE sensors_pressure (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  pressure     decimal   NOT NULL,
  temperature  decimal   NOT NULL,
  altitude     decimal   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_humidity (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  humidity     decimal   NOT NULL,
  temperature  decimal   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_temperature (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  temperature  decimal   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_wind (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  speed        decimal   NOT NULL,
  rpm          integer   NOT NULL,
  hertz        integer   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_precipitation (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  total        decimal   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE weather_log (
  id             SERIAL    NOT NULL,
  reading_time   timestamp NOT NULL DEFAULT now(),
  temperature    decimal   NOT NULL,
  pressure       decimal   NOT NULL,
  humidity       decimal   NOT NULL,
  precipitation  decimal   NOT NULL,
  wind_avg       decimal   NOT NULL,
  wind_gust      decimal   NOT NULL,
  wind_direction integer   NOT NULL,
  PRIMARY KEY (id)
);
