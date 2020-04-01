const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Path = require('path');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const hbs = require('express-handlebars');


const app = express();

app.use (bodyParser.json());

app.use (bodyParser.urlencoded({extended:false}));

// signup route
const usersRoute= require('./routes/users');

app.use('/users', usersRoute);

var FACEBOOK_APP_ID = "210104406973848",
    FACEBOOK_APP_SECRET="2a709187e2f19fd80176b8caf6f767dc";

   // var fbOpts = {
   //    clientId:FACEBOOK_APP_ID,
   //    clientSecret:FACEBOOK_APP_SECRET,
   //    callbackUrl:'http://localhost:8005/auth/facebook/callback'
   // };
   
   var fbCallback = function(accessToken,refreshToken,profile,callback){
      

   };

// passport.use(new FacebookStrategy(fbCallback,({
//    clientId:FACEBOOK_APP_ID,
//        clientSecret:FACEBOOK_APP_SECRET,
//        callbackUrl:'http://localhost:8005/auth/facebook/callback'

// })));

passport.use(new FacebookStrategy({
   clientID: FACEBOOK_APP_ID,
   clientSecret: FACEBOOK_APP_SECRET,
   callbackUrl:'http://localhost:8005/auth/facebook/callback'

 }, function(accessToken, refreshToken, profile, done) {
   User.findOrCreate({facebookId: profile.id}, function (error, user) {
     return done(error, user);
   });
 }
));


app.set('view engine', 'hbs');//instead of app.engine('handlebars', handlebars({
app.engine('hbs', hbs({layoutsDir: __dirname + '/views/layouts', extname: 'hbs'}));

// app.set('view engine','hbs');
// app.engine('hbs',
// hbs({
//     layoutsDir: __dirname +'/views/layouts',
//     extname:'hbs'
// }));
// app.use(express.static(__dirname + '/public'));


// app.use (bodyParser.json());


// app.use (bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
   res.render('index')
});

// app.route('/')
//    .get(passport.authenticate('facebook'));

app.route('/auth/facebook/callback')
   .get(passport.authenticate('facebook')
      //  res.send('this checks the status of the request.Good.luck')
   );

app.get('/signup',function(req,res){
   res.render('signup')
});

app.get('/login',function(req,res){
   res.render('login')

});



const port=8005;

app.listen(port,function(){
   console.log("listening on "+ port)
});