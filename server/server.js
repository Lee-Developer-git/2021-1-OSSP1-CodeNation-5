const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const port = process.env.port || 5000;

const axios = require('axios');
const cheerio = require('cheerio');

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 이후 데이터를 주고 받을 때 post방식을 사용하기 위한 초기 설정입니다. 무시하시면 됩니다.

var mysql = require('mysql');
const { is } = require('cheerio/lib/api/attributes');
var connection = mysql.createConnection({
    host: 'management.ci2wee8elxtt.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'user',
    password: '44596155',
    database: 'codenation',
});

connection.connect(function (err) {
    if (!err) console.log('DB is connected');
    else console.log('DB connect error');
});

app.use('/api/filtering', require('./filtering/filetering'));

app.post('/api/register', function(req, res) {
    var body = req.body;

    var user_name = body.user_name;
    var user_id = body.user_id;
    var user_pw = body.user_pw;

    console.log("request register : " + user_name + " " + user_id + " " + user_pw);

    let SQL = "INSERT INTO user_info (username, user_id, user_pw) VALUES (?, ?, ?)";
    var params = [user_name, user_id, user_pw];
    connection.query(SQL, params, function(error, results, fields) {
        res.send({state:"success", message:"회원가입 되었습니다!"});
    });
});

app.post('/api/register/checknickname', function(req, res) {
    var user_name = req.body.user_name;

    let SQL = "SELECT * FROM user_info WHERE username='" + user_name + "';";
    connection.query(SQL,function(error, results, fields) {
        if(JSON.stringify(results).length > 2)
            res.send({state:"fail", message:"이미 존재하는 닉네임 입니다."});
        else
            res.send({state:"success", message:"사용 가능한 닉네임 입니다."});
    });
});

app.post('/api/register/checkid', function(req, res) {
    var user_id = req.body.user_id;

    let SQL = "SELECT * FROM user_info WHERE user_id='" + user_id + "';";
    connection.query(SQL,function(error, results, fields) {
        if(JSON.stringify(results).length > 2)
            res.send({state:"fail", message:"이미 존재하는 아이디 입니다."});
        else
            res.send({state:"success", message:"사용 가능한 아이디 입니다."});
    });
});

app.post('/api/login', function(req, res) {
    var body = req.body;

    var user_id = body.user_id;
    var user_pw = body.user_pw;

    let SQL = "SELECT * FROM user_info WHERE user_id='" + user_id + "' AND user_pw='" + user_pw + "';";
    connection.query(SQL, function(error, results, fields) {
        if(results[0] === undefined)
            res.send({state:"fail", message:"존재하지 않는 회원이거나 잘못된 아이디, 비밀번호 입니다."});
        else
        {
            console.log(results[0].username + " Log in.");
            res.send({state:"success", username:results[0].username});
        }
    });
});

app.use("/api/search", require("./search"));
app.use("/api/material", require("./material"));


app.listen(port, () => {
    console.log(`listening on port${port}`);
});