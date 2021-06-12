const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'management.ci2wee8elxtt.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'user',
    password: '44596155',
    database: 'codenation',
});

const multer = require('multer');
const upload = multer({ dest: './image' });

//자료 가져오기
const getHTML = async (sel1, sel2) => {
    try {
        return await axios.get('https://search.daum.net/search?nil_suggest=btn&w=blog&DA=SBC&q=' + encodeURI(sel1) + '%26%26'+ encodeURI(sel2));
    } catch (e) {
        console.log(e);
    }
};

router.get('/common', async(req, res) => {
    connection.query('SELECT * FROM common_material ORDER BY id DESC LIMIT 2', (err, rows, fields) => {
        res.send(rows);
    });
});

router.post('/common', async(req, res) => {
    let SQL = 'INSERT INTO common_material VALUES (?, ?, "test", null)';
    try{
        let sel1 = req.body.sel1;
        let sel2 = req.body.sel2;
        const html = await getHTML(sel1, sel2);
        const $ = cheerio.load(html.data);
        const $List = $('.f_link_b');

        let lists = [];
            $List.each((idx, node)=>{
                lists.push({
                    material_name: $(node).text(),
                    material_url: $(node).attr('href')
                });
            });
        var jsonString = JSON.stringify(lists);
        var jsonData = JSON.parse(jsonString);
        var jsonLength = Object.keys(jsonData).length;
        for(i=0; i<4; i++){
            var material_name = jsonData[i].material_name;
            var material_url = jsonData[i].material_url;
            let params = [material_name, material_url];
            connection.query(SQL, params, (err, rows, fields)=>{
                res.send(rows);
            });
        }
    } catch(e){
        console.log(e);
        res.json({ msg: "no files"});
    }
});

// 사진 가져오기
const getImage = async(sel1, sel2) =>{
    try {
        return await axios.get('https://search.daum.net/search?w=img&nil_search=btn&DA=NTB&enc=utf8&q=' + encodeURI(sel1) + '%26%26'+ encodeURI(sel2));
    } catch (e) {
        console.log(e);
    }
}

router.get('/image', async(req, res) => {
    connection.query('SELECT * FROM image_material ORDER BY id DESC LIMIT 2', (err, rows, fields) => {
        res.send(rows);
    });
});

app.use('/image',express.static('./image'));

router.post('/image', upload.single('image'), async(req, res) => {
    let SQL = 'INSERT INTO research VALUES (?, "test", null)';
    try {
        let sel1 = req.body.sel1;
        let sel2 = req.body.sel2;
        const photo = await getImage(sel1, sel2);
        const $ = cheerio.load(photo.data);
        const $List = $('img');

        let lists = [];
            $List.each((idx, node)=>{
                lists.push($(node).attr('src'));
            });
        var jsonString = JSON.stringify(lists);
        var jsonData = JSON.parse(jsonString);
        for(i=0; i<4; i++){
            var image = jsonData[i];
            let params = [image];
            connection.query(SQL, params, (err, rows, fields)=>{
                res.send(rows);
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ msg: "no images"});
    }
});


module.exports=router;