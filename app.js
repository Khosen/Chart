var express = require('express'),
app = express(),
 server = require('http').createServer(app);  
 io = require('socket.io')(server);

port = process.env.PORT || 3000;
var bodyParser = require ('body-parser');
var path = require('path');
var logger = require('morgan');
var flash= require('connect-flash');
var config = require('./config')();
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configdb= require('./config/database');
var fs = require('fs');
var multer = require('multer');

//var io = require('socket.io')(app);
//var multidiv=require('./public/javascript/index')();
//var top100 = require('./routes/top100');


mongoose.Promise = global.Promise;

//mongoose.Promise = Promise;
//configuration===========================
 mongoose.connect(configdb.database, {
 keepAlive: true,
 reconnectTries: Number.MAX_VALUE,
useMongoClient: true

 });

//mongoose.connect(config.database, { useMongoClient: true});
let db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('connected to MongoDB....');
});

//check for errors
db.on('error', function(err){
  console.log(err +'could not connect');
});




//app.get('/', function(req, res) {
//res.send('Hello World!')
//})

//set template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//require('./config/passport') (passport);



//define static path to use css files etc
app.use(logger('dev'));
//body parser and cookie parser middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application json
app.use(bodyParser.json());
//app.use(express.bodyParser({uploadDir:'./uploads'}));

app.use(cookieParser('secret'));

//define static folders u will use
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static(path.join(__dirname +'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static((__dirname + '/public/uploads')));
//app.use(multer({ dest: '/public/uploads/',  rename: function (fieldname, filename) {
  ////  return filename;
  //},
 //}));
//app.use('/top100', top100);

//express session middleware 
app.use(session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

    //cookie: { secure:true  }
}));
 //express messages middleware
 app.use(require('connect-flash')());
 app.use(function (req, res, next){
   res.locals.messages = require('express-messages')(req, res);
   next();
 });
app.use(flash());

 

  //express validator middleware
  app.use(expressValidator({
    errorFormatter: function (param, msg, value){
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

      while(namespace.length){
        formParam  += '['+ namespace.shift() + ']';
      }
      return{
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }));

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
  res.locals.user = req.user||null;
 // console.log(req.user);
  next();

});
/*//required for passport
app.use(session({ secret: 'thissecret',
saveUninitialized: true,
resave: true}));
app.use(passport.initialize());
app.use(passport.session());*/

//call all the routes
let  routes= require('./routes/index');
let users = require('./routes/users');

//let imgupload = require('./routes/upload');
app.use('/', routes);
app.use('/users', users);

/*
var getData = function() {
  return Math.random().toString();
}

app.get('/', function(req, res) {
  //render index.ejs file
  res.render('index', {val: getData()});
});

app.get('/ajax', function(req, res) {
  res.send(getData());
});*/

//bring in topartiste model
//let Topartiste = require('../models/topartiste');

//let topartiste = new Topartiste();

io.on('connection', function(client) {  

  console.log('Client connected...');
  db.collection('topartistes').find({},
     function(err, docs) {
      if(err) throw err;
    
     });
    
 // client.emit('messages', {topartiste.findone()});
 // setInterval(function(){
 ///   client.emit('innert', {'innert': new Date()});
//}, 1000);
//});
  client.on('join', function(data) {
  
      console.log(data);
      // client.emit('messages', {date: new Date()});
     client.emit('messages', {date: new Date(), take: "how are you", list: "images go here"});
     // io.emit('join', data);
    
  });
 
/*  client.on('messages', function(data) {
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
});*/
});

server.listen(port, function(req, res) {
    console.log('todo list RESTful API server started on: ' + port);
   // console.log(new Date(Date.now()).toISOString());
    
});
