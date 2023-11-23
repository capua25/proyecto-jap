const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

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

module.exports = router;