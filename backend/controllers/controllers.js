const models = require('../models/models.js');
const jwt = require('jsonwebtoken');
const KEY = 'secretkeyjapg279sg1';

const login = () => {}

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

module.exports = {
    login,
    getCategories,
    getCatProducts
}