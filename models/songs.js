var mongoose = require('mongoose');
//create schema

var newArtisteSchema = mongoose.Schema({
   
  
    artiste:{
        type: String,
      //  index:{unique:true, dropDups:true},
        required: true,
        trim:true
    },
    photo:{
         type: String,
        required:true,
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

var ash= module.exports= mongoose.model('ash', newArtisteSchema);