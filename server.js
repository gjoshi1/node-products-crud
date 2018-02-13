var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/product'), //created model loading here
  bodyParser = require('body-parser'),
  config = require('config'),
  morgan = require('morgan');



//db connection
// mongoose instance connection url connection

mongoose.connect( config.DBHost,
  {
    poolSize: 2,
    promiseLibrary: global.Promise
  }
);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/products-CRUD');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
  next();
});

var routes = require('./api/routes/productRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Products CRUD RESTful API server started on: ' + port);

module.exports = app; // for testing
