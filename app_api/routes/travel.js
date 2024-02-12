const express = require('express');
const router = express.Router();
const controller = require('../database/models/travel');

router.get('/', controller.travelList);

module.exports = router;