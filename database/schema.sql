CREATE TABLE sensor_pressy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  pressure     double precision NOT NULL,
  temperature  double precision NOT NULL,
  altitude     decimal          NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensor_humy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  humidity     double precision NOT NULL,
  temperature  double precision NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sensor_tempy (
  id           SERIAL           NOT NULL,
  reading_time timestamp        NOT NULL DEFAULT now(),
  temperature  double precision NOT NULL,
  PRIMARY KEY (id)
);
