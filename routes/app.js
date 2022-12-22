const express = require('express');

const router = express.Router();
const isLoggedIn = require('../helpers/isLoggedIn');
const appCtrl = require('../controllers/app.js');

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
router.patch('/settings/update', isLoggedIn , appCtrl.password_change_post);

//Delete APIs
router.delete('/postDelete', isLoggedIn, appCtrl.deletePost_post);

module.exports = router;
