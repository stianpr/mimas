CREATE TABLE sensors_pressy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  pressure     double precision NOT NULL,
  temperature  double precision NOT NULL,
  altitude     decimal          NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_humy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  humidity     double precision NOT NULL,
  temperature  double precision NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensors_tempy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  temperature  double precision NOT NULL,
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

CREATE TABLE sensors_rain (
  id           SERIAL    NOT NULL,
  reading_time timestamp NOT NULL DEFAULT now(),
  total        decimal   NOT NULL,
  PRIMARY KEY (id)
);
