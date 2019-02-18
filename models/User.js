//Модели проекта 
const Sequelize = require('sequelize');
const settings = require('../config/settings');
var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/' + settings.tableName);

const User = sequelize.define('User', {
  token: Sequelize.CHAR,
  name: Sequelize.CHAR,
  start_date:  Sequelize.TIME,
  end_date:  Sequelize.TIME
});


module.exports = User;
