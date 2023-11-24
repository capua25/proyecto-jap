const fs = require('fs');
const { get } = require('http');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce"
});

const login = async (username, password) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
        if (rows.length == 0) {
            const isUser = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
            if (isUser.length == 0) {
                const newUser = await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
                if (newUser.affectedRows == 1) {
                    const rows = await conn.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
                    if (rows.length == 1) {
                        return JSON.stringify(rows[0]);
                    } else {
                        throw new Error('Error al iniciar sesión');
                    }
                } else {
                    throw new Error('Error al crear el usuario');
                }
            } else {
                throw new Error('Error al iniciar sesión');
            }
        } else if (rows.length == 1) {
            return JSON.stringify(rows[0]);
        } else {
            throw new Error('Error al iniciar sesión');
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const getCategories = () => {
    try {
        const response = fs.readFileSync('data/cats/cat.json');
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}
const getCatProd = (id) => {
    try {
        const response = fs.readFileSync(`data/cats_products/${id}.json`);
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const getProductInfo = (id) => {
    try {
        const response = fs.readFileSync(`data/products/${id}.json`);
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const getProductComments = (id) => {
    try {
        const response = fs.readFileSync(`data/products_comments/${id}.json`);
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const getCartInfo = (id) => {
    try {
        const response = fs.readFileSync(`data/user_cart/${id}.json`);
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const getCartBuy = () => {
    try {
        const response = fs.readFileSync(`data/cart/buy.json`);
        if (response != null && response != undefined) {
            return JSON.parse(response);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const addToCart = (id, item) => {
    try {
        const response = fs.readFileSync(`data/user_cart/${id}.json`);
        if (response != null && response != undefined) {
            const cart = JSON.parse(response);
            const index = cart.articles.findIndex(cartItem => cartItem.id == item.id);
            if (index != -1) {
                cart.articles[index].count += item.count;
            } else {
                cart.articles.push(item);
            }
            fs.writeFileSync(`data/user_cart/${id}.json`, JSON.stringify(cart));
            return cart;
        } else {
            return null;
        }
    } catch (err) {
        const cart = { user: id, articles: [] };
        cart.articles.push(item);
        fs.writeFileSync(`data/user_cart/${id}.json`, JSON.stringify(cart));
        return cart;
    }
}

const removeFromCart = (id, id_item) => {
    try {
        const response = fs.readFileSync(`data/user_cart/${id}.json`);
        if (response != null && response != undefined) {
            const cart = JSON.parse(response);
            console.log(cart);
            const index = cart.articles.findIndex(item => item.id == id_item);
            if (index != -1) {
                cart.articles.splice(index, 1);
            }
            fs.writeFileSync(`data/user_cart/${id}.json`, JSON.stringify(cart));
            return cart;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

const publish = () => {
    try {
        const response = fs.readFileSync(`data/sell/publish.json`);
        if (response != null && response != undefined) {
            return response;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

module.exports = {
    login,
    getCategories,
    getCatProd,
    getProductInfo,
    getProductComments,
    getCartInfo,
    getCartBuy,
    addToCart,
    removeFromCart,
    publish
}