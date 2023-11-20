const fs = require('fs');

const getCategories = () => {
    const categories = fs.readFileSync('data/cats/cat.json');
    if (categories != null && categories != undefined){
        return JSON.parse(categories);
    }else{
        return null;
    }
}
const getCatProd = (id) => {
    const categories = fs.readFileSync(`data/cats_products/${id}.json`);
    if (categories != null && categories != undefined){
        return JSON.parse(categories);
    }else{
        return null;
    }
}

const addToCart = (req, res) => {}

const removeFromCart = (req, res) => {}

module.exports = {
    getCategories,
    getCatProd,
    addToCart,
    removeFromCart
}