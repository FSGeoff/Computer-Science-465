var express = require('express');
var router = express.Router();
const controller = require('../controllers/main');

const ctrlMain = require('../controllers/main')

router.get('/', ctrlMain.index);
module.exports = router;