const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup_post);
router.post('/login', authCtrl.login_post);
router.get('/logout', authCtrl.logout_get);
module.exports = router;
