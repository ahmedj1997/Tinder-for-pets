
const {User} = require('../models/Users');
const passport = require('../helpers/passportConfig');

let bcrypt = require('bcrypt');
let salt = 10;

exports.signup_post = function(req,res){
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password,salt)
    let userData = new User(req.body);
    userData.profileImage = 'default.png';
    userData.save()
    .then(() => {
         res.redirect('/home');
    })
    .catch((error)=> {
        console.log(error);
        res.send("Error has occurred.")
    })
}

exports.login_post = passport.authenticate("local",
{
    successRedirect: "/home",
    failureRedirect: "/login"
});

exports.logout_get = function(req, res, next){
    req.logout(function(err){
        return next (err);
    })
    res.redirect("/");
}