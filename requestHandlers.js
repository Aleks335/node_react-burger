const db = require('./db/db');
const jwt = require("jsonwebtoken");
const { secret } = require('./constants');
const privateInformation = { obj: 'rww' };

const fs = require('fs');
const ingredientsFileName = './db/ingredientsDB.json';
const ingredientsFile = require(ingredientsFileName);

const ordersFileName = './db/ordersDB.json';
const ordersFile = require(ordersFileName);

// function write() {
//     file.count++;
//     fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
//         if (err) return console.log(err);
//         console.log(JSON.stringify(file));
//         console.log('writing to ' + fileName);
//     });
// }


function generateToken(login, user_id) {
    return jwt.sign({ login, user_id }, secret, { expiresIn: "9800s", });
}

const ingredients = async (req, res) => {
    res.json({
        ingredients: ingredientsFile.ingredients
    });
};

const addOrder = async (req, res) => {
    const order = {...req.body, user_id: req.tokenData.user_id}
    console.log('id', req.tokenData.user_id); //

    ordersFile.orders.push(order);
    console.log('order',order)
    console.log('ordersFile', ordersFile)
    console.log('ordersFile.orders', ordersFile.orders)

    fs.writeFile(ordersFileName, JSON.stringify(ordersFile), function writeJSON(err) {
        if (err) return console.log(err);
    });

    res.json({
        info: 'Order added',
    });
};

const getOrders = async (req, res) => {
    console.log('getOrders')
    console.log('id', req.tokenData.user_id); //
    const filtredOrders = ordersFile.orders.filter((item)=>item.user_id===req.tokenData.user_id);
    res.json({
        orders: filtredOrders,
    });
};

const signIn = async (req, res) => {
    console.log(1);
    const { login, pass } = req.body
    // Ideally search the user in a database and validate password, throw an error if not found.
    const users = await db.getUserFromDb(login, pass);

    if (users.length > 0) {
        // console.log('users', users)
        // console.log('users[0]',users[0])
        // console.log('user_id', users[0].user_id)
        const token = generateToken(login, users[0].user_id);
        res.json({
            token: `Bearer ${token}`,
        });
    } else {
        res.sendStatus(401);
    }
};

const signUp = async (req, res) => {
    console.log(2);
    const { login, pass } = req.body
    // Ideally search the user in a database and validate password, throw an error if not found.
    const query = await db.insertUserIntoDb(login, pass);

    console.log('query', query)
    console.log('user_id', query.insertId)

    const token = generateToken(login, query.insertId);
    res.json({
        token: `Bearer ${token}`,
    });
};

const private = async (req, res) => {
    console.log('decoded token data: ');
    console.log('login', req.tokenData.login); //

    res.json({
        secret: privateInformation,
    });
};

module.exports = {
    signIn,
    signUp,
    private,
    ingredients,
    addOrder,
    getOrders
}