const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// const auth = require('./auth');
const app = express();

const port = process.env.port || 5000;

const axios = require('axios');
const cheerio = require('cheerio');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 이후 데이터를 주고 받을 때 post방식을 사용하기 위한 초기 설정입니다. 무시하시면 됩니다.

var router = express.Router();

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

const getHTML = async (keyword) => {
    try {
        return await axios.get('https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=' + encodeURI(keyword));
    } catch (e) {
        console.log(e);
    }
};

app.get('/api/search', (req, res) => {
    connection.query('SELECT * FROM search ORDER BY id DESC LIMIT 1', (err, rows, fields) => {
        res.send(rows);
    });
});

// 키워드 추출, 데이터베이스에 저장
app.post('/api/search', async(req, res) => {
    let SQL = 'INSERT INTO search VALUES (null, ?, ?, ?, ?, ?, ?, ?)';
    let keyword = req.body.keyword;
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data); //jquery 사용
    const $courseList = $('.keyword');
    let lists = [];
    $courseList.each((idx, node) => {
        lists.push($(node).text());
    });
    var jsonString = JSON.stringify(lists);
    var jsonData = JSON.parse(jsonString);
    let one = jsonData[0];
    let two = jsonData[1];
    let trd = jsonData[2];
    let four = jsonData[3];
    let five = jsonData[4];
    let six = jsonData[5];
    let params = [keyword, one, two, trd, four, five, six];
    connection.query(SQL, params, (err, rows, fields)=>{
        res.send(rows);
    });
})

// router.get('/', function (req, res) {});

// router.post('/register', auth.register);
// router.post('/login', auth.login);

// app.use('/api', router);

app.listen(port, () => {
    console.log(`listening on port${port}`);
});
