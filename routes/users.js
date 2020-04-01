const express = require ('express');
const router= express.Router();
const db = require('../dbconfig/db');
const Path = require('path');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');


router.get('/signup',function (req,res) {
     res.render('signup');
});
router.post('/signup',function (req,res) {
    var username = req.body.username;
    var email = req.body.email;
    var password1 = req.body.password1;
    var password2 = req.body.password2;


    const saltrounds =10;
    if(password1==password2) {
        bcryptjs.hash(password1, 10,  function ( err,hash)
        { 
            password1=hash;
             console.log(hash);

            var sql = "INSERT INTO `usersdb`(`id`, `username`, `email`, `password`) VALUES (NULL,'" +username+ "','" + email + "','"+hash+"')";
            db.query(sql,function (err, result) {
                if (err)
                    throw err;
                else {
                    res.send('signed in successfully');
                }

            });
        });
    }


 });

 router.get('/login',function(req,res){
    res.render('login');
 });

 router.post('/login',function(req,res){
   var email=req.body.email;
   var password =req.body.password;

// check   if user exists 
if (email == email && password==password){
var sql="SELECT * FROM `usersdb` WHERE email = '"+email+"' AND password = '"+password+"'";
db.query(sql,function(err,result){
    if(err){
    throw err;
    }else{
        res.send('logged in successfuly')
    }

});


}
 
});



 module.exports=router;
