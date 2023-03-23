const mysql = require('mysql');

const con = mysql.createConnection({
    host: "141.8.193.236",
    user: "f0428517",
    password: "ebvuebidni",
    database: 'f0428517_egor',
    port:3306
    // password: "ebueidni",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db!");
});

function getUserFromDb(login, pass) {
    console.log(login,pass);
    
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM users WHERE login=? AND pass=?', [login, pass], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function insertUserIntoDb(login, pass) {
    console.log(login,pass);
    
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO users (login,pass) VALUES (?,?);', [login, pass], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}


module.exports = {
    getUserFromDb,
    insertUserIntoDb
}

