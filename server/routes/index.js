const express = require('express');
const router = express.Router();
let mysql = require('mysql'); 

let connection = mysql.createConnection({
    host: 'ls-08aa70866569420461a0d672b7c9d0b0821b42a0.ctoxkzgo9rsa.ap-northeast-2.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: '-K`DbayHh2J0mUkZoC)D4=3yHD&SVwbB',
    database: 'dbmaster' 
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
    let user_id = req.body.id;
    let user_password = req.body.pwd;
    let sql = `insert into user(user_id, user_password) values (?, ?)`;
    connection.query(sql, [user_id, user_password], function (err, rows, fields) {
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!')
        }
    })
});

router.post('/login', function (req, res) {
    let user_id = req.body.id;
    let user_password = req.body.pwd;

    let sql = `SELECT user_id FROM user WHERE user_id = (?) AND user_password = (?)`;
    connection.query(sql, [user_id, user_password], function (err, rows, fields) {

        let logged = new Object();
        logged.success = false;
        if ( err ) {
            console.log(err)
        } else if (rows[0] === undefined) {
            logged.success = false;
            res.send(logged);
        } else {
            logged.success = true;
            res.send(logged);
        }
    })
});
module.exports = router;