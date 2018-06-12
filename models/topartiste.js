var mongoose = require('mongoose');
//create schema

var topArtisteSchema = mongoose.Schema({

    rating:{
        type: Number,
        required:true,
        trim:true
    },
    artiste:{
        type: String,
        required: true,
        trim:true
    },
    photo:{
         type: String,
        required:true,
        trim:true
     },
    song:{
        type:String,
        required:true,
        trim:true
    },
    week:{
        type: Number,
        required: true,
        trim:true
    },
    source:{
        type: String,
        required:true,
        trim:true
    }
});

var Topartiste = module.exports= mongoose.model('Topartiste', topArtisteSchema);