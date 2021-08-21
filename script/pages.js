const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
router.get('/', (req, res) => {
    res.render('index');
})
router.get('/register', (req, res) => {
    res.render('regi');
})
router.get('/login', (req, res) => {
    res.render('signin');
})

router.get('/users', (req, res) => {
    res.render('user');
})

router.get('/initdb', (req, res) => {
    res.render('initdb');
})
router.get('/insertblog', (req, res) => {
    res.render('insertblog');
})
router.get('/list', (req, res) => {
    res.render('bloglist');
})
router.get('/comment', (req, res) => {
    res.render('commentpage');
})

router.get('/subcomment', (req, res) => {
    res.render('subcomment');
})
router.get('/result', (req, res) => {
    res.render('searchresult');
})
router.get('/resultblog', (req, res) => {
    res.render('searchresult');
})
router.get('/resultfollwers', (req, res) => {
    res.render('searchresult');
})
router.get('/resultblogcontainstagx', (req, res) => {
    res.render('searchresult');
})
router.get('/resultusernevercomment', (req, res) => {
    res.render('searchresult');
})
module.exports = router;