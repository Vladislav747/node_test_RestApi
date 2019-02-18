const pg = require('pg');

const settings = require('../config/settings');

var connectionString = 'postgres://postgres:@localhost:5432/' + settings.tableName;

const client = new pg.Client(connectionString);

client.connect();


module.exports = client;