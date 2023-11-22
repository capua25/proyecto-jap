const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

//categories
router.get('/cats', controllers.getCategories);

//products
router.get('/cats_products/:id', controllers.getCatProducts);

//products info
router.get('/products/:id', controllers.getProductInfo);

//products comments
router.get('/products_comments/:id', controllers.getProductComments);

//cart info
router.get('/user_cart/:id', controllers.getCartInfo);

module.exports = router;