
//npm nodemon: to update the page dynamically
//npm hbs: ahndlebars view engine for express
//npm dotevn: to encode any privacy information
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
//option wether use 'npm path' currently
// const path = require('path');
dotenv.config({path: './.env'});
//connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
//create database
// app.get("/newdb", (req,res) => {
//     let sql = "CREATE DATABASE name";
//     db.query(sql,(err) =>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send("new database created");
//         }
//     })
// })


const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.set('view engine', 'hbs');
app.use('/',require('./script/pages'))
app.use('/verify',require('./script/verify'))
// app.get('/', (req,res) => {
//     res.render("index");
// })

// app.get('/register', (req,res) => {
//     res.render("regi");
// })

app.listen('5000',()=>{
    console.log('server is on port 5000');
})

//connect to mysql
db.connect (err => {
    if(err){
        console.log(err);
    }else{
        console.log("MySQL is ruuning...");
    }
})


