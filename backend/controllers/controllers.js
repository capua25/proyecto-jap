const models = require('../models/models.js');
const jwt = require('jsonwebtoken');
const KEY = 'secretkeyjapg279sg1';

const login = (req, res) => {
    const response = models.login(req.body.user, req.body.password);
    if (response){
        if (req.body.user != response.user || req.body.password != response.password){
            res.status(401).json({error: 'Credenciales inválidas', auth: false, token: null});
        }else{
            const token = jwt.sign({id: response.id}, KEY);
            res.status(200).json({auth: true, token});
        }
    }else{
        res.status(500).json({error: 'Usuario no encontrado'});
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

module.exports = {
    login,
    getCategories,
    getCatProducts,
    getProductInfo,
    getProductComments,
    getCartInfo
}