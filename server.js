const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require("passport");
require('dotenv').config();
var session = require('express-session');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));


app.use(
    session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 36000000}
}));

app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');
const appRouter = require('./routes/app');
const authRouter = require('./routes/auth')

app.use('/', indexRouter);
app.use('/', appRouter);
app.use('/', authRouter);

app.listen(port, function(){
    console.log(`Listening on ${port}`);
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB, () => {
    console.log('mongoDB connected');
});