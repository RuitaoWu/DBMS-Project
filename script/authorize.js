const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

//new user registration
exports.register = (req,res) => {
    console.log(req.body);
    const {username,password,confirmpassword} = req.body;
    db.query('SELECT user_name FROM user_infor WHERE user_name=?',[username], (err, results) =>{
        if(err){
            console.log(err);
        }
        if(results.length > 0 ){
            return res.render('regi',{
                message: 'user name used'
            });
        } else if( password != confirmpassword){
            return res.render('regi',{
                message: 'password is not identical'
            });
        }
        db.query('INSERT INTO user_infor SET ?',{user_name:username, password:password}, (err, results) =>{
            if(err){
                console.log(err);
            }else{
                console.log(results);
                return res.render('regi',{
                    message: 'Success'
                });
            }
        })
    })
}


// user login
exports.login = (req,res) =>{
    const name = req.body.username;
    db.query('SELECT * FROM user_infor WHERE user_name = ?',[name],(err, results) => {
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            return res.render('signin',{ message: "ok"});
        }else{
            return res.render('signin',{ message: "invalide"});
        }
        
    })
}