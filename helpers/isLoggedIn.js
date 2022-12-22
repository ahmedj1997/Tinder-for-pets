module.exports = function isLoggedIn(req,res, next){
    if(!req.user){
        res.redirect('/');
        return false;
    }else{
        next();
    }
}