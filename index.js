const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const bodyParser = require("body-parser");
const connection = require("./db.js");
const {getProjectDetails, getAllprojects} = require('./CRUD');
const { resourceLimits } = require('worker_threads');
const { strictEqual } = require('assert');
const updateMimush = require("./updateMimush");
const LogIn = require("./login");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));

app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname, 'Static')));

app.set('view engine', 'pug');

app.get('/home', (req,res) =>{
    res.render('home');
});

app.get('/usageWays', (req,res) =>{
    res.render('roads');
});

app.get('/entry', (req,res) =>{
    res.render('entry');
});

app.get('/execution', (req,res) =>{
    res.render('execution');
});


app.get('/details', (req,res) =>{
    res.render('details');
});

app.get('/menu', getAllprojects);

app.get('/roads', (req,res) =>{
    res.render('roads');
});

app.get('/:projectname', getProjectDetails);

const sql = require("./db");
app.get("/getprojects", function(req, res) {
    let q1 = "select * from budgetdb.projects";
    sql.query(q1 , (err, mysqlres)=> {
        if(err){
            console.log("error: ", err);``
            res.status(400).send({message: "error in gettind al projects" + err});
            return;
        }
        console.log("got all projects");
        res.send(mysqlres);
        return;
    });
});

app.post('/entry',LogIn.logIn);

app.post("/execution",updateMimush.updatemimush);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connection.connect(function(err){
    if(err) throw err;
  })
});

