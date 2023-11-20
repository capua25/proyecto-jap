const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/cats', controllers.getCategories);

router.get('/cats_products/:id', controllers.getCatProducts);

module.exports = router;