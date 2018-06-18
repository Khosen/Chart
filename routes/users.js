'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
//bring in user model
let  User = require('../models/user');

//let  songs = require('../models/songs');
//bring in newartiste model
let musician = require('../models/artisteSong');


//temp
//let musician = require('../models/newArtiste2');
//let newartiste = new musician();
//create distination file for image
//let upload = multer({ dest: './uploads' })
var img;   var names;
//set storage engine
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
      cb(null,file.fieldname+ '-'+ Date.now() + path.extname(file.originalname));
    
    }
   });
//init upload
var upload  = multer({
    storage:storage,
    limits: {fileSize:1000000},
   //   fileFilter: function(req, file, cb){
     //  checkFileType(file, cb);
  // }
  }).single('artisteImage');

//check file type
function checkFileType(file, cb){
    //allowed ext
    const filetypes =/png/;
//check extension
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//check mime
const mimetype= filetypes.test(file.mimetype);

if(mimetype && extname){
    return cb(null, true);

}else{
    cb('Error: Images Only!');
}
}
//register form
router.get('/register', function(req, res){
    res.render('register');
});

//Regsiter Process
router.post('/register', function(req, res){
    const name= req.body.name;
  const username= req.body.username;
  const  password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password id required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
 

let errors = req.validationErrors();

if(errors){
    res.render('register', {
        errors:errors

    });

}else {
    let newUser = new User({
        name:name,
        username:username,
        password:password
    });
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            newUser.password=hash;
            newUser.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }else{
                   
                     req.session.save(function () {
                        res.redirect('/users/login');
                    });
                
                 //  console.log("ok");
                   // res.redirect('/users/login');
                                 
                }
            });
        });
    });
}

});
//login form
router.get('/login', function(req, res){
    res.render('login');
});


//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/users/Menu',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
   // console.log(req.user);
});

//redirect process
router.get('/Menu', ensureAuthenticated,function(req, res){
    res.render('Menu');
});

router.get('/redirect', function(req, res){
    //var name="ok";
     res.redirect('admin');
    // console.log(req.body.artiste);
 });
 
router.get('/admin', ensureAuthenticated,function(req, res){
   //var name="ok";
    res.render('admin');
   // console.log(req.body.artiste);
});
//logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

router.get('/songs', ensureAuthenticated,function(req, res){
  //  let newartiste = new musician();
    
    res.render('songs');
});
router.post('/songs', function(req, res){
  
    //    var name=req.body.artiste;
    var name=req.body.artiste ;
     var photo=img;
     var docs={
        song: req.body.song
        , week: req.body.week
        , source:req.body.source
        ,rating: req.body.rating  
     }
    musician.updateOne({artiste:req.body.artiste}, {$push:{
         streamer:docs
     }}, function(err, result){
         console.log(result + img +photo);
     })
     req.flash("success", "File Uploaded!");
     res.render('songs',{name:name, photo:photo});
  });


//get data to database\

//show names of existing atiste in dropdown
router.get('/addsongs', function(req, res){
    musician.find({}, function(err, docs, next){
        if(err){
          console.log(err);
        }else{
        console.log("Loaded?");
       // 
        res.render('songs',{artistename: docs});
        console.log(docs +"this is the error");
    //   res.json({artistename: docs});
        }
      
      }).sort({artiste:1});
      //callback();
   //   musician.close();
  });


  
//post songs
/*router.post('/addsongs', function(req, res){
    
   // let song= new songs();
   let song= new songs();
      
      song.artiste=req.body.artistenames;
      song.song= req.body.song;
      song.week = req.body.week;
      song.source=req.body.source;
      var name=req.body.artistenames;
      song.save(function(err){
          if(err){
              console.log(err);
              console.log("not executing");
              res.render('songs', {msg: 'Dno data saved!'});
              return;
          }else{
              console.log("saved");
             // res.redirect('/upload');
          //   res.render('songs');
             res.render('admin', {msg: 'Data saved!'});
          }
      });
   // res.render('songs');
  console.log(req.body.source + req.body.artistenames);
});*/
//router.get('/upload', function(req, res){
  //  res.render('upload');
//});

//upload image
router.post('/admin', function(req, res){
    upload(req, res, (err)=>{
        if(err){
            res.render('admin',{
                msg: err
            });
        }else{
            console.log(res.req.file);
           // res.send('test');
           if(req.file == undefined){
                return res.render('admin', {
                    message: 'danger: No File Selected!'
                });
            }
            let newartiste = new musician(); 
            let imgpath = req.file.path;
           
            console.log(imgpath);
            imgpath = imgpath.slice(6); //removes the /public from the path
            imgpath= imgpath.replace(/\\/g, "/");
            newartiste.photo =imgpath;
            var photo=imgpath;

            newartiste.artiste = req.body.artiste;
            newartiste.streamer= [{
                song: req.body.song
                , week: req.body.week
                , source: req.body.source
                ,rating: req.body.rating
                 }];
                 
            newartiste.date= new Date(Date.now()).toISOString();
         
       
           
            img=imgpath;
           var  name=req.body.artiste;
           newartiste.save(function(err,doc){
                if(err){
                    console.log(err);
                    //res.redirect('users/admin', {msg: 'artiste already exists!'});
                   res.redirect(400, 'admin');
                    return;
                }else{
               
                    console.log("saved");
                 req.flash("success", "File Uploaded!");
                 //   res.locals.messages=req.flash();
                   // res.redirect('/upload');
                      //   res.render('admin',{msg: 'artiste saved!'}); 
                        // process.exit(0);
                 res.render('songs',{name:name, photo:photo});
                }
           
            });
           /* console.log(req.body.rating);
            console.log(req.body.artiste);
            console.log(req.body.sources);*/
          console.log(req.file.filename);
          //console.log(name);
           console.log(req.body);
           
        }
    });
  
});

function ensureAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next();

    }else{
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
module.exports = router;