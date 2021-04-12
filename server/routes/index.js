const express = require('express');
const router = express.Router();
let mysql = require('mysql'); 

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lord15926535',
    database: 'mazerunner' 
});

connection.connect(); 

router.post('/check', function (req, res) {
    let user_id = req.body.id;

    let sql = 'select user_id from user where user_id = ?';
    connection.query(sql, [user_id], function (err, rows, fields) {

        let cid = new Object();
        cid.possible = false;

        if (rows[0] === undefined) {
            cid.possible = true;
            res.send(cid);
        } else {
            cid.possible = false;
            res.send(cid);  
        }
    })
});

router.post('/signup', function (req, res) {
    console.log('z')

    let sql = 'select user_id from user where user_id = ?';
    connection.query(sql, [user_id], function (err, rows, fields) {

        let cid = new Object();
        cid.possible = false;

        if (rows[0] === undefined) {
            cid.possible = true;
            res.send(cid);
        } else {
            cid.possible = false;
            res.send(cid);  
        }
    })
});

module.exports = router;