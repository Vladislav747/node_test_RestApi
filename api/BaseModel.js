var validate = require("validate.js");

const pg = require('pg');
const settings = require('../config/settings');
var connectionString = 'postgres://postgres:@localhost:5432/' + settings.tableName;
const client = new pg.Client(connectionString);

client.connect();


class BaseModel {

  constructor(client) {
    this.client = client;
  }

  //Get all users
  list() {
    const client = this.client;

    return new Promise(function (resolve, reject) {

      const query = client.query('select * from users').then((res) => {
        resolve(res);
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  //Get User by id
  getById(req) {

    const client = this.client;

    var UserId = parseInt(req.params.id);

    return new Promise(function (resolve, reject) {

      const query = client.query('select * from users where id = $1', [UserId]).then((res) => {
        resolve('UserName is ' + res);
      })
        .catch((err) => {
          reject(err);
        });
    });
  }


  //Create new User send token back
  createUser(req, res) {
    const client = this.client;
    //Validate that username we got not empty
    if (validate.isEmpty(req.query.name)) {
      return res.status(400).json(
        {
          status: 'fail',
          message: 'UserName is Empty'
        }
      )
    }
    var UserName = req.query.name;

    return new Promise(function (resolve, reject) {
      //User Validation in Base
      const query = client.query('select * from users where name = $1',
        [UserName]).then((data) => {

          if (data.rowCount > 0) {
            resolve(UserName + ' is already Busy - Try another one')
            return;
          }

          //Set parameters for token
          var startDate = new Date();
          var endDate = new Date();
          endDate.setHours(endDate.getHours() + 2);
          //To create a token generate a random number and convert it to base 36
          var token = function () {
            return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
          };
          client.query('insert into users(name, token ,start_date, end_date) values($1, $2, $3, $4)', [UserName, token(), startDate, endDate]);
          resolve(UserName + 'You have registered. Your token is  ' + token());
        })
        .catch((err) => {
          return reject(err);
        })
    })
  }

  update(req, res) {

    //Validate that username we got not empty
    if (validate.isEmpty(req.query.name)) {
      return res.status(400).json(
        {
          status: 'fail',
          message: 'UserName is Empty'
        }
      )
    }

    var UserName = req.query.name;
    var userId = parseInt(req.params.id);

    return new Promise(function (resolve, reject) {
      //User Validation in Base
      const query = client.query('select * from users where id = $1',
        [userId]).then((data) => {

          if (data.rowCount == 0) {
            resolve('There is no such UserId ' + userId + '  Try another one')
            return;
          }

          const query = client.query('update users set name=$1 where id=$2',
            [UserName, userId]).then((res) => {
              resolve('UserName updated for User Id '+ userId + ' Now your UserName is ' + UserName);
            })

            .catch((err) => {
              reject(err);
            })
        })
    })
  }


  loginUser(req, res) {

    //Validate that username we got not empty
    if (validate.isEmpty(req.query.name)) {
      return res.status(400).json(
        {
          status: 'fail',
          message: 'UserName is Empty'
        }
      )
    }

    var userName = req.query.name;

    return new Promise(function (resolve, reject) {

      //User Validation in Base
      const query = client.query('select * from users where name = $1',
        [userName]).then((data) => {

          if (data.rowCount = 0) {
            resolve(' Sorry ' + userName + ' can not be found')
            return;
          }

          const query = client.query('select token from users where name=$1',
            [userName]).then((res) => {
              resolve('Login successful your token is  - ' + res.rows[0]);
            })
            .catch((err) => {
              reject(err);
            })
        })
    })
  }

  deleteUser(req, res) {

    var userId = parseInt(req.params.id);

    return new Promise(function (resolve, reject) {

      //User Validation in Base
      const query = client.query('select * from users where id = $1',
        [userId]).then((data) => {

          if (data.rowCount = 0) {
            resolve(' Sorry no such ' + userId + ' can not be found')
            return;
          }

          const query = client.query('delete * from users where id=$1',
            [userId]).then((res) => {
              resolve('User with UserId' + userId + ' is deleted');
            })

            .catch((err) => {
              reject(err);
            })
        })
    })
  }

}



module.exports = BaseModel;
