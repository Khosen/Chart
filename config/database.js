/*var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/top100'
MongoClient.connect(url)
  .then(function (db) { // <- db as first argument
    console.log('db connected')
  })
  .catch(function (err) {})
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/top100';
var db;

exports.connect = function(callback) {
  MongoClient.connect(mongoUrl, function(err, database) {
    if( err ) throw err;
    db = database;
    callback();
  });
}

exports.doSomethingWithDatabase = function(callback){
  // this is using the same db connection
  db.collection('top100').find({}, function(err, docs) {
    // do something
    callback(docs);
  });
};*/
//var MongoClient=require('mongodb').MongoClient;
//mongoose
//var db;
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.7.0.3:27107/data/db');*/
 
/*var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/top100', (err, db) => { 
    if (err) return console.log(err +'db error')
    else{
        console.log('Mongo Conn....');

      }
    //db=database
    });*/

   // module.exports = {
    //  'url' : 'mongodb://localhost:27017/top100'
    //}
   //var mongoose = require('mongoose');
    //mongoose.Promise = global.Promise;
         
  //  mongoose.connect('mongodb://localhost:27017/top100', {
    //  keepAlive: true,
    //  reconnectTries: Number.MAX_VALUE,
     // useMongoClient: true
      
   // });
    //console.log('connected to MongoDB');
  //module.exports = mongoose;

  module.exports ={
    //database:'mongodb://localhost:27017/top100',
    database:'mongodb://Khels:@khosen11@ds247310.mlab.com:47310/top100',
    secret: 'mysecret'
  }
/*
    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/top100");
    //new Promise(() => { throw new Error('exception!'); });*/
    