const pg = require('pg');

const settings = require('../config/settings');

var connectionString = 'postgres://postgres:postgres@localhost:5432/' + settings.tableName;

const client = new pg.Client(connectionString);

  client.connect()
  .then(()=> client.query('CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, token VARCHAR not null, name VARCHAR, start_date timestamp without time zone, end_date timestamp without time zone)'))
  .then(()=> client.query('INSERT INTO users (name, token, start_date, end_date) VALUES ("Vlad", "123123njsdfsdf123123@" ,"2019-02-16 07:37:16-08", "2019-02-16 08:37:16-08"'))
  .then(()=>client.end())
  .catch(err=>console.log(err));