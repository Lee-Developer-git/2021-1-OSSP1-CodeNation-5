const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const auth = require('./auth');

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

app.post('/api/register', auth.register);
app.post('/api/login', auth.login);
app.use("/api/search", require("./search"));
app.use("/api/material", require("./material"));
// router.get('/', function (req, res) {});

// router.post('/register', auth.register);
// router.post('/login', auth.login);

// app.use('/api', router);


app.listen(port, () => {
    console.log(`listening on port${port}`);
});