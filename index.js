const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const hbs = require('express-handlebars');


const app = express();
// signup route
const usersRoute= require('./routes/users');

app.use('/users', usersRoute);
// app.use('/login',loginRoutes);


app.set('view engine', 'hbs');//instead of app.engine('handlebars', handlebars({
app.engine('hbs', hbs({layoutsDir: __dirname + '/views/layouts', extname: 'hbs'}));

// app.set('view engine','hbs');
// app.engine('hbs',
// hbs({
//     layoutsDir: __dirname +'/views/layouts',
//     extname:'hbs'
// }));
// app.use(express.static(__dirname + '/public'));


app.use (bodyParser.json());


app.use (bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
   res.render('index')
});

app.get('/signup',function(req,res){
   res.render('signup')
});



const port=8003;

app.listen(port,function(){
   console.log("listening on "+ port)
});