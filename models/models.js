const fs = require('fs');

const login = (username, password) => {
    const users = fs.readFileSync('data/users.json');
    if (users != null && users != undefined){
        return JSON.parse(users);
        console.log(users);
    }else{
        const user_id = fs.readFileSync('data/counter.json');
        const counter = JSON.parse(user_id).current_id + 1;
        const new_user = { id: counter, user: username, password: password};
        fs.writeFileSync('data/users.json', JSON.stringify(new_user));
        return new_user;
    }
}

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
    login,
    getCategories,
    getCatProd,
    getProductInfo,
    getProductComments,
    getCartInfo,
    addToCart,
    removeFromCart
}