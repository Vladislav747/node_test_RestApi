
var client = require('../config/init.js');
//Class BaseModel For RestApi
var BaseModel = require('./BaseModel.js');

module.exports = function (app) {
  // create an object of BaseModel
  var basemodel = new BaseModel(client);

  // Index route
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/getUsers',
    function (req, res) {      
      //call the API
      basemodel.list()
        .then(function (data) {
          // API call successful
          res.status(200).json(data);
        })
        .catch(function (error) {
          // API call failed
          console.log(error);
        });
    });


  app.get('/getUsers/:id',
    function (req, res) {
      // create an object of BaseModel
      const basemodel = new BaseModel(client);
      //call the API
      basemodel.getById(req)
        .then(function (data) {
          // API call successful
          res.status(200).json(data);
        })
        .catch(function (error) {
          // API call failed
          console.log(error);
        });
    });

    //Here return token
  app.post('/createUser',
    function (req, res) {
     //call the API
      basemodel.createUser(req,res)
        .then(function (data) {
          // API call successful
          res.status(200).json(data);
        })
        .catch(function (error) {
          // API call failed
          console.log(error);
        });
    });

    //Here return token
  app.post('/login',
  function (req, res) {
   //call the API
    basemodel.loginUser(req,res)
      .then(function (data) {
        // API call successful
        res.status(200).json(data);
      })
      .catch(function (error) {
        // API call failed
        console.log(error);
      });
  });

  app.put('/updateUser/:id',
  function (req, res) {
    //call the API
     basemodel.update(req,res)
       .then(function (data) {
         // API call successful
         res.status(200).json(data);
       })
       .catch(function (error) {
         // API call failed
         console.log(error);
       })
      })



    app.delete('/deleteUser/:id', 
    function (req, res) {
      //call the API
       basemodel.deleteUser(req,res)
         .then(function (data) {
           // API call successful
           res.status(200).json(data);
         })
         .catch(function (error) {
           // API call failed
           console.log(error);
         })
        }
    );
}

