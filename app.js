//Bringing the dependencies
const express = require('express');
const app = express();
//CORS headers
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const pg = require('pg');
const pg_promise = require('pg-promise');
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

//Enable cors
app.use(cors());
//set public folder and set engine for rendering static files
app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

//Routing in another file
require('./api/routing.js')(app);

