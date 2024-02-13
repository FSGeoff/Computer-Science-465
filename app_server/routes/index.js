const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/main');

const ctrlMain = require('../controllers/main')

router.get('/', ctrlMain.index);
module.exports = router;
