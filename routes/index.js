const express = require('express');
const router = express.Router();

const appCtrl = require('../controllers/app');
router.get('/', appCtrl.index_show_get);

module.exports = router;