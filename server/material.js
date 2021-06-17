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
    multipleStatements: true
});
connection.connect();

const multer = require('multer');
const { request } = require('express');
const upload = multer({ dest: './image' });

//자료 가져오기
const getHTML = async (sel1, sel2) => {
    try {
        return await axios.get('https://search.daum.net/search?nil_suggest=btn&w=blog&DA=SBC&q=' + encodeURI(sel1) + '%26%26'+ encodeURI(sel2));
    } catch (e) {
        console.log(e);
    }
};

router.get('/common/:id', async(req, res) => {
    let SQL = "SELECT * FROM common_material WHERE user_id='" + req.params.id + "';";
    connection.query(SQL, (err, rows, fields) => {
        res.send(rows);
    });
});

router.get('/common', async(req, res) => {
    let SQL = "SELECT * FROM common_material ORDER BY id DESC LIMIT 4;";
    connection.query(SQL, (err, rows, fields) => {
        res.send(rows);
    });
});

router.post('/common/save', async(req, res) => {
    let SQL = "UPDATE common_material SET user_id='" + req.body.user_id + "' WHERE material_link='" + req.body.material_link + "';";
    connection.query(SQL, (err, rows, fields) => {
        console.log("common save\n"+req.body.user_id+" "+req.body.material_link);
        res.send({message: "success"});
    }) 
});

router.post('/common', async(req, res) => {
    let SQL = "INSERT INTO common_material(material_name, material_link, user_id, id, sel1, sel2) VALUES (?, ?, ?, ?, ?, ?);";
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
        var SQLS = "";
        for(i=0; i<4; i++){
            var materialname = jsonData[i].material_name;
            var materialurl = jsonData[i].material_url;
            SQLS += mysql.format(SQL, [materialname, materialurl, 'TEST1ID', null, sel1, sel2]);
        }
        connection.query(SQLS, (err, rows, fields)=>{
            res.send(rows);
        });
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

router.get('/image/:id', async(req, res) => {
    let SQL = "SELECT * FROM image_material WHERE user_id='" + req.params.id + "';";
    connection.query(SQL, (err, rows, fields) => {
        res.send(rows);
    });
});

router.get('/image', async(req, res) => {
    let SQL = "SELECT * FROM image_material;";
    connection.query(SQL, (err, rows, fields) => {
        res.send(rows);
    });
});

app.use('/image',express.static('./image'));

router.post('/image/save', async(req, res) => {
    let SQL = "UPDATE image_material SET user_id='" + req.body.user_id + "' WHERE image_link='" + req.body.image_link + "';";
    connection.query(SQL, (err, rows, fields) => {
        console.log("image save\n"+rows);
        res.send({message: "success"});
    }) 
});

router.post('/image', upload.single('image'), async(req, res) => {
    let SQL = "INSERT INTO image_material(image_link, user_id, id, sel1, sel2) VALUES (?, ?, ?, ?, ?);";
    try {
        let sel1 = req.body.sel1;
        let sel2 = req.body.sel2;
        const photo = await getImage(sel1, sel2);
        const $ = cheerio.load(photo.data);
        const $List = $('.thumb_img');

        let lists = [];
            $List.each((idx, node)=>{
                lists.push($(node).attr('src'));
            });
        var jsonString = JSON.stringify(lists);
        var jsonData = JSON.parse(jsonString);
        var SQLS = "";
        for(i=0; i<4; i++){
            var image = jsonData[i];
            SQLS += mysql.format(SQL, [image, 'TEST1ID', null, sel1, sel2]);
        }
        console.log(SQLS);
        connection.query(SQLS, (err, rows, fields)=>{
            res.send(rows);
        });
    } catch (e) {
        console.log(e);
        res.json({ msg: "no images"});
    }
});


module.exports=router;