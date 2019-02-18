var validate = require("validate.js");

const initOptions = {};
var pgp = require('pg-promise')(initOptions);
const settings = require('../config/settings');

var connectionString = 'postgres://postgres:@localhost:5432/' + settings.tableName;
var db = pgp(connectionString);

//Проверка соединения с базой
db.connect()
  .then(obj => {
    obj.done();
    console.log('База PostgreSQL доступна');
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });


// add query functions
function list(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All Users we have in DataBase'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getById(req, res, next) {

  var UserId = parseInt(req.params.id);
  db.one('select * from users where id = $1', UserId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recieved one user ' + UserId
        });
    })
    .catch(function (err) {
      res.status(404)
        .json({
          status: 'fail',
          message: 'User not found ' + UserId + ' Try another one'
        })
      return next(err);
    });
}

function createUser(req, res, next) {
  //Validate that username we got not empty
  if (validate.isEmpty(req.body.name)) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'UserName is Empty'
      }
    )
  }
  var UserName = req.body.name;

  //Validation on UserName is not already on database
  db.any('select * from users where name = $1', UserName)
    .then(function (data) {
      console.log(data);
      if (data.length > 0) {
        return res.status(404)
          .json({
            status: 'fail',
            message: UserName + ' - Try another one'
          })
      }
      //Set parameters for token
      var startDate = new Date();
      var endDate = new Date();
      endDate.setHours(endDate.getHours() + 2);
      //To create a token generate a random number and convert it to base 36
      var token = function () {
        return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
      };
      db.none('insert into users(name, token ,start_date, end_date) values(${name}, ${token}, ${start_date}, ${end_date})',
        {
          name: Name,
          token: token(),
          start_date: startDate,
          end_date: endDate,
        })
      return res.status(200)
        .json({
          status: 'success',
          message: 'Now Registered' + UserName + ' Your New Token is ' + token
        })
    })
    .catch(error => {
      console.log('ERROR:', error);
    });
}


function create(req, res, next) {
  var Name = req.body.name;
  // validateUser(Name);
  var startDate = new Date();
  var endDate = new Date();
  endDate.setHours(endDate.getHours() + 2);

  //To create a token generate a random number and convert it to base 36
  var token = function () {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  };

  db.none('insert into users(name, token ,start_date, end_date) values(${name}, ${token}, ${start_date}, ${end_date})',
    {
      name: Name,
      token: token(),
      start_date: startDate,
      end_date: endDate,
    })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted User Name ' + Name
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Обновить пользователя
function update(req, res, next) {

  //Validate that username we got not empty
  if (validate.isEmpty(req.body.name)) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'UserName is Empty'
      }
    )
  }
  var userName = req.body.name;
  var userId = parseInt(req.params.id);
  db.none('update users set name=$1 where id=$2',
    [userName, userId])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user ' + userName
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Удалить пользователя
function deleteUser(req, res, next) {

  var userId = parseInt(req.params.id);
  db.result('delete from users where id = $1', userId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed User with ${userId}`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = {
  list: list,
  getById: getById,
  create: createUser,
  update: update,
  deleteUser: deleteUser,

};