//Модели проекта 
const Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  token: Sequelize.CHAR,
  start_date:  Sequelize.TIME,
  end_date:  Sequelize.TIME
});

