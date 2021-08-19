const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
var theDate = new Date();
var year = theDate.getFullYear();
var mon = theDate.getMonth()+1;
var day = theDate.getDate();
var postDate = year+"-"+mon+"-"+day;
var positiveSentiment = "positive";
//save user id
var tempUid;
//save blog id
var tempBlogId;
//new user registration
//Node.js use placeholder for the SQL Injection prevent
exports.register = (req,res) => {
    const {username,password,confirmpassword,email} = req.body;
    db.query('SELECT username FROM users WHERE username=?',[username], (err, results) =>{
        if(err){
            console.error();
        }
        if(results.length > 0){
            console.log("Print at line 27: Username used");
            return res.render('regi',{
                message: 'user name used'
            });
        } else if( password != confirmpassword){
            console.log("Print at line 32: Password doesn't match");
            return res.render('regi',{
                message: 'password is not identical'
            });
        }

        db.query('SELECT email FROM users WHERE email=?',[email], (err,results) =>{
            if(err){
                throw err;
            }
            if(results.length > 0){
                console.log("Print at line 43: Email used");
                return res.render('regi',{
                    message: 'Email is used'
                });
            }else{
                db.query('INSERT INTO users SET ?',{username:username, password:password,email:email}, (err, results) =>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Print at line 51: Sucess");
                        return res.render('regi',{
                            message: 'Success'
                        });
                    }
                })
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
            tempUid = results[0].userid;
            return res.render('user',{ username:name, userid: results[0].userid, email:results[0].email,fname:results[0].fname,lname:results[0].lname}); 
        }else{
            return res.render('signin',{ message: "Username or password is invalid"});
        }
        
    })
}

// user logout
exports.logout = (req,res) =>{
    return res.render('user',{ username:"", userid: ""}); 
}


//database initiate
exports.initdb = (req,res) => {
    db.query("/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */");
    db.query("/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */");
    db.query("/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */");
    db.query("/*!50503 SET NAMES utf8 */");
    db.query("/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */");
    db.query("/*!40103 SET TIME_ZONE='+00:00' */");
    db.query("/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */");
    db.query("/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */");
    db.query("/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */");
    db.query("/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */");
    db.query("use dbms");
    db.query("DROP TABLE IF EXISTS `blogs`");
    db.query("CREATE TABLE `blogs` (`blogid` int(10) unsigned NOT NULL AUTO_INCREMENT,`subject` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,`description` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,`pdate` date DEFAULT NULL,`userid` int(10) DEFAULT NULL,PRIMARY KEY (`blogid`), KEY `idx_blogs_pdate` (`pdate`), KEY `blogs_ibfk_1_idx` (`userid`),CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    //Trigger
    //canont execute this sql, and it must be execute in MySQL
    //db.query("DROP TRIGGER IF EXISTS `dbms`.`blogs_BEFORE_INSERT`;DELIMITER $$ USE `dbms`$$ CREATE DEFINER=`comp440`@`localhost` TRIGGER `blogs_BEFORE_INSERT` BEFORE INSERT ON `blogs` FOR EACH ROW BEGIN declare rowcount int; SELECT COUNT(*) INTO rowcount FROM blogs WHERE userid=NEW.userid AND pdate=CURDATE(); IF(rowcount>=2)THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You cannot post more than two belogs per day!Please try tomorrow.'; END IF; END$$ DELIMITER ;");
    // db.query("/*!40101 SET character_set_client = @saved_cs_client */");
    db.query("LOCK TABLES `blogs` WRITE");
    db.query("INSERT INTO `blogs` VALUES (1,'Hello World','Hey everyone, this is my first blog. Hello world and all who inhabit it!','2020-03-15',6)");
    db.query("INSERT INTO `blogs` VALUES(2,'I love cats!','Cats are amazing. They\\'re awesome, and fuzzy, and cute. Who DOESN\\'T love cats?','2020-03-17',3)");
    db.query("INSERT INTO `blogs` VALUES(3,'Dogs are the best.','So I saw a post the other day talking about cats. Now, I love cats. They\\'re great. But here\\'s the thing: dogs are just the best, okay? There\\'s no question about it. That is all.','2020-03-19',4)");
    db.query("INSERT INTO `blogs` VALUES(4,'I am the night.','To all you lowly criminals out there, this is a warning to know I am watching. I am justice. I am righteousness. I am the NIGHT.','2020-03-24',1)");
    db.query("INSERT INTO `blogs` VALUES(5,'Waka waka','waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka','2020-03-31',9)");
    db.query("INSERT INTO `blogs` VALUES(6,'Who is this Bob guy?','Decided to start tracking down this mysterious human known as \\'Bob.\\' Who is Bob? What does he do? WHY does he do it? There is a lot of mystery surrounding this person, and I will be going into detail in future posts. Stay tuned!','2020-04-02',8)");
    db.query("INSERT INTO `blogs` VALUES(7,'Re: I love cats.','A reader recently reached out to me about my last post. To be clear, I\\'m not dissing our canine companions! But we\\'ve got to be honest here, why are cats better? They\\'re smart, affectionate, and great cuddle partners. Cats are better. It\\'s just fact.','2020-04-04',3)");
    db.query("INSERT INTO `blogs` VALUES(8,'Scooby Dooby Doo!','The search for scooby snacks: Where did they go? I know this whole quarantine thing is affecting businesses, but aren\\'t scooby snacks counted as an essential service? Please post below if you find anything! I\\'m going crazy here!','2020-04-05',10)");
    db.query("INSERT INTO `blogs` VALUES(9,'Bob Update','Dear readers, I know you have been waiting anxiously for an update on Bob, but there is not much to share so far. He appears to have little to no online presence. Just a clarification: I am decidedly NOT Bob. Thanks all. Stay tuned for more!','2020-04-06',8)");
    db.query("INSERT INTO `blogs` VALUES(10,'Lizard People.','What are your guys\\' thoughts on them? I, for one, welcome out reptitlian overlords.','2020-04-12',5)");
    db.query("UNLOCK TABLES");
    db.query("DROP TABLE IF EXISTS `blogstags`");
    db.query("CREATE TABLE `blogstags` (`blogid` int(10) unsigned NOT NULL,`tag` varchar(20) COLLATE utf8mb4_general_ci NOT NULL, PRIMARY KEY (`blogid`,`tag`), CONSTRAINT `blogstags_ibfk_1` FOREIGN KEY (`blogid`) REFERENCES `blogs` (`blogid`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    db.query("LOCK TABLES `blogstags` WRITE");
    db.query("INSERT INTO `blogstags` VALUES (1,'hello world'),(2,'animals'),(2,'cats'),(3,'animals'),(3,'dogs'),(4,'crime'),(4,'justice'),(5,'cartoon'),(5,'waka'),(6,'bob'),(6,'update'),(7,'cats'),(7,'dogs'),(8,'dogs'),(8,'quarantine'),(8,'scooby snacks'),(9,'bob'),(9,'update'),(10,'lizards')");
    db.query("UNLOCK TABLES");
    db.query("DROP TABLE IF EXISTS `comments`");
    db.query("CREATE TABLE `comments` (`commentid` int(10) NOT NULL AUTO_INCREMENT,`sentiment` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,`description` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL, `cdate` date DEFAULT NULL,`blogid` int(10) unsigned DEFAULT NULL,`authorid` int(10) DEFAULT NULL,PRIMARY KEY (`commentid`),KEY `comments_ibfk_2` (`blogid`), KEY `test_idx` (`authorid`),CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blogid`) REFERENCES `blogs` (`blogid`),CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`authorid`) REFERENCES `users` (`userid`),CONSTRAINT `sentiment_types` CHECK ((`sentiment` in (_utf8mb4'negative',_utf8mb4'positive')))) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    db.query("LOCK TABLES `comments` WRITE");
    db.query("INSERT INTO `comments` VALUES (1,'negative','Cats are cool and all, but dogs are where it\\'s at.','2020-03-17',2,4),(2,'negative','What\\'s all the hype about? Cats are clearly superior.','2020-03-20',3,3),(3,'positive','Nice.','2020-03-20',4,10),(4,'positive','Who IS Bob? I can\\'t wait to find out.','2020-04-02',6,6),(5,'negative','I guess cat people just don\\'t know what they\\'re missing.','2020-04-05',7,4),(6,'positive','This is totally unrelated, but I just wanted to say I am a HUGE fan of yours. I love your work!','2020-04-05',8,4),(7,'positive','Have you checked out Dog-Mart? They\\'ve got everything.','2020-04-06',8,7),(8,'negative','I was hoping there\\'d be more of an update. Sorry, Bob.','2020-04-07',9,6),(9,'positive','I think they\\'re all secretly cats. Open your eyes, sheeple!','2020-04-13',10,4),(10,'negative','Who? Me? Multimillionaire philanthropist of Arkham? A lizard person? Nope. Nothing to see here!','2020-04-15',10,1)");
    db.query("UNLOCK TABLES");
    db.query("DROP TABLE IF EXISTS `follows`");
    db.query("CREATE TABLE `follows` (`leaderid` int(10) NOT NULL,`followerid` int(10) NOT NULL,PRIMARY KEY (`leaderid`,`followerid`),KEY `follows_ibfk_2_idx` (`followerid`),CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`leaderid`) REFERENCES `users` (`userid`),CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followerid`) REFERENCES `users` (`userid`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    db.query("LOCK TABLES `follows` WRITE");
    db.query("INSERT INTO `follows` VALUES (6,2),(1,3),(4,3),(3,4),(6,5),(9,7),(2,8),(5,8),(1,9),(10,9),(4,10),(9,10)");
    db.query("UNLOCK TABLES");
    db.query("DROP TABLE IF EXISTS `hobbies`");
    db.query("CREATE TABLE `hobbies` (`userid` int(10) NOT NULL,`hobby` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,PRIMARY KEY (`hobby`,`userid`),KEY `test_idx` (`userid`),CONSTRAINT `hobbies_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),CONSTRAINT `hobby_types` CHECK ((`hobby` in (_utf8mb4'hiking',_utf8mb4'swimming',_utf8mb4'calligraphy',_utf8mb4'bowling',_utf8mb4'movie',_utf8mb4'cooking',_utf8mb4'dancing')))) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    db.query("LOCK TABLES `hobbies` WRITE");
    db.query("INSERT INTO `hobbies` VALUES (1,'movie'),(2,'movie'),(3,'movie'),(4,'hiking'),(5,'dancing'),(5,'movie'),(6,'hiking'),(7,'bowling'),(8,'calligraphy'),(9,'dancing'),(9,'movie'),(10,'cooking')");
    db.query("UNLOCK TABLES");
    db.query("DROP TABLE IF EXISTS `users`");
    db.query("CREATE TABLE `users` (`userid` int(10) NOT NULL AUTO_INCREMENT,`username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,`password` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,`email` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,PRIMARY KEY (`userid`),UNIQUE KEY `username_UNIQUE` (`username`)) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")
    db.query("LOCK TABLES `users` WRITE");
    db.query("INSERT INTO `users` VALUES (1,'batman','1234','nananana@batman.com'),(2,'bob','12345','bobthatsme@yahoo.com'),(3,'catlover','abcd','catlover@whiskers.com'),(4,'doglover','efds','doglover@bark.net'),(5,'jdoe','25478','jane@doe.com'),(6,'jsmith','1111','jsmith@gmail.com'),(7,'matty','2222','matty@csun.edu'),(8,'notbob','5555','stopcallingmebob@yahoo.com'),(9,'pacman','9999','pacman@gmail.com'),(10,'scooby','8888','scooby@doo.net')");
    db.query("UNLOCK TABLES");
    return res.render('initdb', {message: "Success"});
    
}






//insert
exports.insertblog = (req,res) =>{
    const {uid} = req.body;
    tempUid = uid;
    return res.render('insertblog',{userid:uid});
}
//new blog
exports.subnewblog = (req,res)=>{
    const {subject,descript,tag} = req.body;

    //
    // db.query("SELECT COUNT(*) as count FROM blogs WHERE userid = ? AND date = ?",[tempUid,new Date()],(err,rows)=>{
    //     if(rows[0].count == 2){
    //         return res.render('insertblog',{message:"You have already posted 2 blogs today"});
    //     }
    //     else{
    //         db.query("INSERT INTO blogs (userid,subject,description,tag,date) VALUES (?,?,?,?,?)",[tempUid,subject,descript,tag,new Date()],(err,rows)=>{
    //             if(err){
    //                 return res.render('insertblog',{message:"Error inserting blog"});
    //             }
    //             else{
    //                 return res.render('insertblog',{message:"Success"});
    //             }
    //         });
    //     }
    // });
    //check date
    db.query("SELECT count(userid) AS useridCount FROM blogs where userid = ? AND pdate = ?",[tempUid,postDate],(err,countuid)=>{
        console.log("this is: "+countuid[0].useridCount+", and postDate: "+postDate);
        if(err) throw err;
        if(countuid[0].useridCount >= 2){
            console.log("Print at line 184: Failed to insert new blog")
            return res.render('insertblog',{message:"Current userID: "+tempUid+" have already posted 2 blogs today"});
        }else{
            db.query("INSERT INTO `blogs` SET ?",{subject:subject,description:descript,pdate:new Date(),userid:tempUid},(err,results)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.render('insertblog',{message:"Success"});
                }
            });
            tempBlogId=db.query("SELECT blogid FROM `blogs` WHERE userid= ?",[tempUid]);
            const tagArr = tag.split(",");
            for(i =0;i < tagArr.length;i++){
                db.query("INSERT INTO `blogstags` SET ?",{tag:tagArr[i],blogid:tempUid},(err)=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
            
        }
        
    });

    
}

//list blog
exports.listBlog = (req,res)=>{
    const {usid} = req.body;
    db.query("SELECT * FROM blogs",(err,result)=>{
        if (err) throw err;
        res.render('bloglist', {userData: result,mestest:usid});
    })
}


//comment page
exports.commentpage = (req,res) =>{
    return res.render('commentpage',{userid:tempUid});
}

//submit new comment
exports.subnewcomment = (req,res)=>{
    const{blognum,senti,descript} = req.body;
    let comDate = new Date();
    db.query("SELECT * FROM blogs WHERE blogid = ? ",[blognum],(err,result)=>{
        if(err) throw err;
        if(result.length >0){
            db.query("SELECT blogid,authorid FROM comments WHERE blogid =? AND authorid = ?",[blognum,tempUid], (err,ress)=>{
                if(err) throw err;
                if(ress.length > 0){
                    return res.render('subcomment',{testText:"Each user can only comments a blog one time!"});
                }else{
                    db.query("SELECT * FROM blogs WHERE blogid = ? AND userid = ?",[blognum,tempUid],(err,resu)=>{
                        if(err) throw err;
                        if(resu.length > 0){
                            return res.render('subcomment',{testText:"You can not comment your own blog"});
                        }else{
                            db.query("INSERT INTO `comments` SET ?",{sentiment:senti,description:descript,cdate:new Date(),blogid:blognum,authorid:tempUid},(err,results)=>{
                                if(err) throw err;
                                console.log("Print at line 245: Success Comment");
                                return res.render('subcomment',{testText:"Success"});
                            });
                        }
                    })

                }
            })
            
        }else{
            console.log("Print at line 255: Failed to submmit comment");
            return res.render('subcomment',{testText:"Failed: "+blognum});
        }
    })
    
}

//serach result
//List all the blogs of user X, such that all the comments are positive for these blogs. 
exports.serres= (req,res)=>{
    const {inputUser} = req.body;
    db.query("SELECT * FROM comments WHERE blogid IN (SELECT blogid FROM blogs WHERE userid = ?) AND sentiment = ?",[inputUser,positiveSentiment],(err,resComment)=>{
        if(err) throw err;
        return res.render('searchresult',{commetnData:resComment});
    })
    
}
//List the users who posted the most number of blogs on 10/10/2020; if there is a tie,list all the users who have a tie.
//the following query will return total number of blogs that user posted on 2021-08-05
//SELECT userid,count(*) as "total" FROM dbms.blogs where pdate="2021-08-05" group by userid;
exports.serblog= (req,res)=>{
    let tempArr=[];
    db.query("SELECT userid, COUNT(*) AS 'total' FROM dbms.blogs WHERE pdate = '2020-10-10' GROUP BY userid ORDER BY total DESC",(err,resMax)=>{
        if(err) throw err;
        if(resMax.length == 0){
            return res.render('searchresult',{arrayContent:"No result!"});
        }else{
            if(resMax[0].total == 2){
                for(let i=0;i<resMax.length;i++){
                    if(resMax[i].total == 2){
                        tempArr.push(resMax[i].userid);
                    }
                }
                return res.render('searchresult',{arrayContent:"User "+tempArr+" posted most blogs"});
            }
            if(resMax[0].total == 1){
                for(let i=0;i<resMax.length;i++){
                    if(resMax[i].total == 1){
                        tempArr.push(resMax[i].userid);
                    }
                }
                return res.render('searchresult',{arrayContent:"User "+tempArr+" posted most blogs"});
            }
        }
        
    })
    
}
// List the users who are followed by both X and Y. Usernames X and Y are inputs from the user. 
//SELECT * FROM follows WHERE leaderid = ? AND followerid IN (SELECT followerid FROM follows WHERE leaderid = ?)
//SELECT * FROM follows WHERE followerid = ? and leaderid in (select leaderid from follows where followerid = ?)
exports.follwers= (req,res)=>{
    const {userX,userY} = req.body;
    db.query("SELECT * FROM follows WHERE followerid = ? and leaderid in (select leaderid from follows where followerid = ?)",[userX,userY],(err,resultUser)=>{
        if(err) throw err;
        return res.render('searchresult',{userFollowedByXY: resultUser[0].leaderid,user1:userX,user2:userY});
    })
}
exports.blogContainsTag= (req,res)=>{
    const {tagX} = req.body;
    db.query("SELECT b.blogid,b.subject,b.description,b.userid,blogstags.tag FROM blogs as b INNER JOIN blogstags ON b.blogid = blogstags.blogid  WHERE tag = ?",[tagX],(err,resTag)=>{
        if (err) throw err;
        return res.render('searchresult',{blogTag:resTag});
    })
    
}
exports.neverComment= (req,res)=>{
    db.query("SELECT userid,username,email  FROM users WHERE userid NOT IN (SELECT authorid FROM comments)",(err,resUser)=>{
        if(err) throw err;
        return res.render('searchresult',{userInfo:resUser,titleInfo:"User Never Post Comment"});
    })
    
}
