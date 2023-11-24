const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');
const jwt = require('jsonwebtoken');
const KEY = 'secretkeyjapg279sg1';

//login
router.post('/login', controllers.login);

//categories
router.get('/cats', controllers.getCategories);

//products
router.get('/cats_products/:id', controllers.getCatProducts);

//products info
router.get('/products/:id', controllers.getProductInfo);

//products comments
router.get('/products_comments/:id', controllers.getProductComments);

//cart info
router.use('/user_cart/:id', (req, res, next) => {
    const token = req.headers['access-token'];
    if (token){
        jwt.verify(token, KEY, (err, decoded) => {
            if (err){
                return res.json({message: 'Token inválido'});
            }else{
                next();
            }
        });
    }else{
        res.send({
            message: 'Token no encontrado'
        });
    }
});
router.get('/user_cart/:id', controllers.getCartInfo);
router.post('/user_cart/:id', controllers.addToCart);
router.delete('/user_cart/:id', controllers.removeFromCart);

//cart buy
router.get('/cart/buy', controllers.getCartBuy);

//sell
router.get('/sell', controllers.publish);

module.exports = router;