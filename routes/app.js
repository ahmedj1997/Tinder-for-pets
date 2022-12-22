const express = require('express');

const router = express.Router();
const isLoggedIn = require('../helpers/isLoggedIn');
const appCtrl = require('../controllers/app.js');

//Pass user data to every route.
router.use(function(req,res,next){
    res.locals.user = req.user
    next()
})

//Get APIs
router.get('/home', isLoggedIn, appCtrl.home_show_get);
router.get('/feed/friends', isLoggedIn, appCtrl.friendsFeed_show_get)
router.get('/profile/:id', isLoggedIn, appCtrl.profile_show_get);
router.get('/settings', isLoggedIn, appCtrl.settings_show_get);
router.get('/settings/friends', isLoggedIn, appCtrl.friends_list_get);
//Post APIs
router.post('/newpost', isLoggedIn,appCtrl.newPost_post);
router.post('/addFriend', isLoggedIn, appCtrl.add_friend_post);
router.post('/removeFriend', isLoggedIn, appCtrl.remove_friend_post);

//Update APIs
router.patch('/profileimg/update', appCtrl.profile_picture_update);
router.patch('/settings/update', isLoggedIn , appCtrl.profile_change_post);

//Delete APIs
router.delete('/postDelete', isLoggedIn, appCtrl.deletePost_post);
module.exports = router;
