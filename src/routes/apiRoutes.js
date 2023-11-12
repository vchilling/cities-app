const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/cities', cityController.getCities);
router.post('/addCity', cityController.addCity);

module.exports = router;
