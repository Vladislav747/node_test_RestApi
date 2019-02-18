
/*
\c dbname - подсоединение к БД dbname.
*/
\c users;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
  ID SERIAL PRIMARY KEY NOT NULL,
  token VARCHAR,
  name VARCHAR,
  start_date timestamp without time zone,
  end_date timestamp without time zone
);

INSERT INTO users (name, token, start_date, end_date)
  VALUES ('Vlad', '123123njsdfsdf123123@' ,'2019-02-16 07:37:16-08', '2019-02-16 08:37:16-08');