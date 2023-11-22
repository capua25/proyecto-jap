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

const getProductInfo = (id) => {
    const categories = fs.readFileSync(`data/products/${id}.json`);
    if (categories != null && categories != undefined){
        return JSON.parse(categories);
    }else{
        return null;
    }
}

const getProductComments = (id) => {
    const categories = fs.readFileSync(`data/products_comments/${id}.json`);
    if (categories != null && categories != undefined){
        return JSON.parse(categories);
    }else{
        return null;
    }
}

const getCartInfo = (id) => {
    const categories = fs.readFileSync(`data/user_cart/${id}.json`);
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
    getProductInfo,
    getProductComments,
    getCartInfo,
    addToCart,
    removeFromCart
}