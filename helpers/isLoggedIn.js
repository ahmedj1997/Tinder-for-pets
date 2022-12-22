module.exports = function isLoggedIn(req,res, next){
    if(!req.user){
        res.redirect('/');
        return false;
    }else{
        res.locals.user = req.user;
        next();
    }
}