const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'management.ci2wee8elxtt.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'user',
    password: '44596155',
    database: 'codenation',
});

const router = express.Router();

// var PythonShell = require('python-shell');

// var options = {
//     mode: 'text',
//     pythonPath: '',
//     pythonOptions: ['-u'],
//     scriptPath: '',
//     args: [filepath]
//   }

//   filepath = '/Users/jiwon/Downloads/사무자동화산업기사필기_핵심요점정리.pdf'
//   PythonShell.run('read_file.py', options, function (err, results) {
//     if (err) throw err;
//     console.log('results: %j', results);
//   });

keyword1 = "";
keyword2 = "";
keyword3 = "";
keyword4 = "";
keyword5 = "";


filepath = '/Users/jiwon/Downloads/사무자동화산업기사필기_핵심요점정리.pdf'
re = "dd"

function keyword(filepath) {
    const spawn = require('child_process').spawn;
    const result = spawn('python', ['read_file.py', filepath]); 
    result.stdout.on('data', (result)=>{ re=result.toString(); printresult(re)
    });
}

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM filtering ORDER BY DESC LIMIT 1', (err, rows, fields) => {
        res.send(rows)
    })
})

router.post('/',(req, res) =>{
    let SQL = "INSERT INTO filtering VALUES (null, ?, ?, ?, ?, ?, ?)"
    let filepath = req.body.filepath;

    data=re;
    var a = JSON.parse(JSON.stringify((data)));
    var count = 0;
    for (var key in data) {
        if (count ==1 ) {
            if(data[key]=='\''){
                count=count+1;
            }
            else{
            keyword1 = keyword1+data[key];
            }
        }
        if (count ==4 ) {
            if(data[key]=='\''){
                count=count+1;
            }
            else{
                keyword2 = keyword2+data[key];
                }
        }
        if (count ==7 ) {
            if(data[key]=='\''){
                count=count+1;
            }
            else{
                keyword3 = keyword3+data[key];
                }
        }

        if (count ==10 ) {
            if(data[key]=='\''){
                count=count+1;
            }
            else{
                keyword4 = keyword4+data[key];
                }
        }

        if (count ==13 ) {
            if(data[key]=='\''){
                count=count+1;
            }
            else{
                keyword5 = keyword5+data[key];
                }
        }

        else {
            if(data[key]=='\''){
                count=count+1;
            }
        }
    }
    let keyword1 = keyword1;
    let keyword2 = keyword2;
    let keyword3 = keyword3;
    let keyword4 = keyword4;
    let keyword5 = keyword5;
    const params = [filepath, keyword1, keyword2, keyword3, keyword4, keyword5];
    connection.query(SQL, params, (err, rows, fields)=>{
        res.send(rows);
    })
})


// var read_file = document.getElementById('read');
keyword(filepath);


// var fs = require('fs');
// var data = JSON.parse(JSON.stringify((fs.readFileSync('/Users/jiwon/Codenation/2021-1-OSSP1-CodeNation-5-1/client/1.json', 'utf8'))));
// console.log(data)

module.exports=router;