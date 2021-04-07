var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology:true});

//Get the default connection
var db = mongoose.connection;
//bind connection to error event
db.on('error',console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){console.log("Connection to DB succeeded");});

var Foood = require("./models/food");

async function recreateDB(){
  //delete everything
  await Foood.deleteMany();
  let instance1 = new Foood({foodquantity:"Large", foodprice:15, foodcolor:"Brown"});
  let instance2 = new Foood({foodquantity:"Small", foodprice:10, foodcolor:"Brown"});
  let instance3 = new Foood({foodquantity:"Medium", foodprice:12.5, foodcolor:"Brown"});
  instance1.save( 
    function(err,doc){
      if(err) return console.error(err);
      console.log("First object saved");
    }
  )
  
  instance2.save( 
    function(err,doc){
      if(err) return console.error(err);
      console.log("Second object saved");
    }
  )
  
  instance3.save( 
    function(err,doc){
      if(err) return console.error(err);
      console.log("Third object saved");
    }
  )
}
let reseed = true;
if(reseed){ recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodRouter = require('./routes/food');
var starsrouter = require('./routes/stars');
var slotrouter = require('./routes/slot');
var resourcerouter = require('./routes/resource')

const { MongooseDocument } = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use('/stars', starsrouter);
app.use('/slot', slotrouter);
app.use('/resource', resourcerouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;