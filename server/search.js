const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'management.ci2wee8elxtt.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'user',
    password: '44596155',
    database: 'codenation',
});

const getHTML = async (keyword) => {
    try {
        return await axios.get('https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=' + encodeURI(keyword));
    } catch (e) {
        console.log(e);
    }
};

router.get('/', async(req, res) => {
    connection.query('SELECT * FROM search ORDER BY id DESC LIMIT 1', (err, rows, fields) => {
        res.send(rows);
    });
});

// 키워드 추출, 데이터베이스에 저장
router.post('/', async(req, res) => {
    let SQL = 'INSERT INTO search VALUES (null, ?, ?, ?, ?, ?, ?, ?)';
    let keyword = req.body.keyword;
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $keywordList = $('.keyword');
    let lists = [];
    $keywordList.each((idx, node) => {
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
});

module.exports = router;