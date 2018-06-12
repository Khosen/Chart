//'use strict';

var express = require('express');
var router = express.Router();
//var io = require('socket.io');
//var top100control = require('./controllers/top100Controller');
//this is the logic to retrieve data from db for home page
//bring in the artiste model
let artistes= require('../models/topartiste');
let  songs = require('../models/songs');
//bring in newartiste model
let musician = require('../models/artisteSong');


router.get('/', function(req, res){
  // let artistes = new Topartiste();
   //get data from topartiste collection and render to html page
  // artistes.find({}, function(err, docs){
    
  /*musician.find({}, function(err, docs){
  
       if(err){
      console.log(err);
    }else{
      console.log("Loaded?");
     res.render('index',{artistesong: docs});
    }

  });*/
  musician.aggregate([{$unwind:"$streamer"}, 
  {$group:{_id:"$artiste", song:{"$first":"$streamer.song"},
   source:{$first:"$streamer.source"}, photo:{$first:"$photo"}, Rating:{$max:"$streamer.rating"}}},
    {$sort:{Rating:-1}}], function(err, docs){
    
         if(err){
        console.log(err);
      }else{
        console.log(docs);
       res.render('index',{artistesong: docs});
      }
    });
  
 });

//  res.render('index',    columndiv.innerHTML="hello"+i + "row"+x)
//router.post('/top100', function(req, res){
  //  res.render('top100');
//});
//router.route('/').post(top100control.postinfo);

module.exports = router;
