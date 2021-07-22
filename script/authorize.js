const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

//new user registration
//Node.js use placeholder for the SQL Injection prevent
exports.register = (req,res) => {
    console.log(req.body);
    const {username,password,confirmpassword,fname,lname,email} = req.body;
    db.query('SELECT username FROM users WHERE username=?',[username], (err, results) =>{
        if(err){
            console.error();
        }
        if(results.length > 0){
            return res.render('regi',{
                message: 'user name used'
            });
        } else if( password != confirmpassword){
            return res.render('regi',{
                message: 'password is not identical'
            });
        }

        db.query('SELECT email FROM users WHERE email=?',[email], (err,results) =>{
            if(err){
                throw err;
            }
            if(results.length > 0){
                return res.render('regi',{
                    message: 'Email is used'
                });
            }
        })

        db.query('INSERT INTO users SET ?',{username:username, password:password,email:email,fname:fname,lname:lname}, (err, results) =>{
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
            console.log(results);
            return res.render('user',{ username:name, userid: results[0].id, email:results[0].email,fname:results[0].fname,lname:results[0].lname}); 
        }else{
            return res.render('signin',{ message: "Username or password is invalid"});
        }
        
    })
}

// user logout
exports.logout = (req,res) =>{
    return res.render('user',{ username:"", userid: ""}); 
}