const express = require('express');
const app = express();

const port = 4000;

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render('../views/index.ejs');
});

app.listen(port, function(){
    console.log(`Listneing on ${port}`);
});