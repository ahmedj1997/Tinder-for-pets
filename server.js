const { urlencoded } = require('express');
//var expressLayouts = require('express-ejs-layouts');


const express = require('express');
const app = express();

const port = 4000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

express.urlencoded({extended: true});

app.get('/',function(req,res){
    res.render('../views/index.ejs');
});

app.get('/profile',function(req,res){
    res.render('../views/profile.ejs');
});

app.get('/home', function(req,res){
    res.render('../views/home.ejs');
})

app.get('/settings', function(req,res){
    res.render('../views/settings.ejs');
})
app.listen(port, function(){
    console.log(`Listneing on ${port}`);
});