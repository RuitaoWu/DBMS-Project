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
    db.query('SELECT username FROM users WHERE username=?',[username], (err, results) =>{
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
        db.query('INSERT INTO users SET ?',{username:username, password:password}, (err, results) =>{
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
    const passcode = req.body.password;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?',[name,passcode],(err, results) => {
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            return res.render('user',{ username:name, userid: results[0].id}); 
        }else{
            return res.render('user',{ username: "Username or password is invalid"});
        }
        
    })
}

// user logout
exports.logout = (req,res) =>{
    return res.render('user',{ username:"", userid: ""}); 
}