var mongoose = require('mongoose');
//create schema

var artisteSongSchema = mongoose.Schema({
   
  
    artiste:{
        type: String,
      index:{unique:true, dropDups:true},
        required: true,
        trim:true
    },
    photo:{
         type: String,
        required:false,
        trim:true
     },
     streamer:[{
        song:{
            type:String,
            required:false,
            trim:true
        },
        week:{
            type: Number,
            required: false,
            trim:true
        },
        source:{
            type: String,
            required:false,
            trim:true                                                                                                                                                                                                                      
        },
        rating:{
            type: String,
            required:false,
            trim:true
        }
      } ],
     date: { type: Date, default: Date.now,   trim:true }

});

var artisteSong = module.exports= mongoose.model('artisteSong', artisteSongSchema);