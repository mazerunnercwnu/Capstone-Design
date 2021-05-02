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

router.post('/saving_map', function (req, res) {
    const map_data = req.body.map;
    const map_height = req.body.height;
    const map_width = req.body.width;
    const map_name = req.body.title;
    const map_prod = req.body.prod;

    let sql = `insert into map(map_data, map_name, map_height, map_width, map_prod) values (?, ?, ?, ?, ?)`;
    connection.query(sql, [map_data, map_name, map_height, map_width, map_prod], function (err, rows, fields){
        
        const save = new Object();
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!');
            save.success = true;
            res.send(save);
        }
    })
});

router.post('/loading_map', function (req, res) {
    let map_id = req.body.map_id;

    let sql = `SELECT map_data, map_height, map_width FROM map WHERE map_id = ?`;
    connection.query(sql, [map_id], function (err, rows, fields) {
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!');
            res.send(rows[0]);
        }
    })
});

router.post('/loading_data', function (req, res) {
    const page = req.body.page;
    
    let sql = `SELECT map_id, map_name, map_prod FROM map ORDER BY map_id DESC Limit ${page * 10}, ${page * 10 + 10}`

    connection.query(sql, [] , function (err, rows, fields){
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!');
            res.send(rows);
        }
    })
});

router.post('/clear',  function (req, res) {
    const map_id = req.body.map_id;
    const user_id = req.body.user_id;
    const timer = req.body.timer;

    let sql = `insert into ranking(map_id, user_id, timer) values (?, ?, ?)`

    connection.query(sql, [map_id, user_id, timer] , function (err, rows, fields){
        let clear = new Object();
        
        if ( err ) {
            console.log(err);
        } else {
            console.log('success!');
            clear.success = true;
            res.send(clear);
        }
    })
});

router.post('/loading_rank', function (req, res) {
    const map_id = req.body.map_id;

    let sql = `SELECT user_id, timer FROM ranking WHERE map_id = ? ORDER BY timer`
    
    connection.query(sql, [ map_id ] , function (err, rows, fields){
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!');
            res.send(rows);
        }
    })
});

router.get('/length', function (req, res) {
    let sql = `SELECT COUNT (map_id) as cnt FROM map`

    connection.query(sql, [] , function (err, rows, fields){
        if ( err ) {
            console.log(err)
        } else {
            console.log('success!');
            res.send(rows);
        }
    })
})
module.exports = router;