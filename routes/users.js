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
    var username= req.body.username;
    var email = req.body.email;
    var password1 = req.body.password1;
    var password2 = req.body.password2;



    if(password1==password2) {
        bcryptjs.hash("password1, 10",  function ( err,hash)
        {
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



 module.exports=router;
