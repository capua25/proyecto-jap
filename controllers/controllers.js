const models = require('../models/models.js');
const jwt = require('jsonwebtoken');
const KEY = 'secretkeyjapg279sg1';

const login = async (req, res) => {
    const log = await models.login(req.body.username, req.body.password);
    const response = await JSON.parse(log);
    console.log(response);
    if (response){
        if (req.body.username !== response.username || req.body.password !== response.password){
            if(req.body.username != response.username){
                const token = jwt.sign({id: response.id}, KEY);
                res.status(200).json({user_id: response.id, auth: true, token});
            }else if(req.body.password != response.password){
                res.status(401).json({error: 'Contraseña inválida', auth: false, token: null});
            }
        }else{
            const token = jwt.sign({id: response.id}, KEY);
            res.status(200).json({user_id: response.id, auth: true, token});
        }
    }else{
        res.status(500).json({error: 'Error del servidor'});
    }
}

const getCategories = (req, res) => {
    const response = models.getCategories();
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const getCatProducts = (req, res) => {
    const response = models.getCatProd(req.params.id);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const getProductInfo = (req, res) => {
    const response = models.getProductInfo(req.params.id);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const getProductComments = (req, res) => {
    const response = models.getProductComments(req.params.id);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const getCartInfo = (req, res) => {
    const response = models.getCartInfo(req.params.id);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const getCartBuy = (req, res) => {
    const response = models.getCartBuy();
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const addToCart = (req, res) => {
    const response = models.addToCart(req.params.id, req.body);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

const removeFromCart = (req, res) => {
    const response = models.removeFromCart(req.params.id, req.body.id);
    if (response){
        res.status(200).json(response);
    }else{
        res.status(500).json({error: 'Error interno'});
    }
}

module.exports = {
    login,
    getCategories,
    getCatProducts,
    getProductInfo,
    getProductComments,
    getCartInfo,
    getCartBuy,
    addToCart,
    removeFromCart
}