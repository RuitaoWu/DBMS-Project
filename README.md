# DBMS-Project<br>
### Requirement<br>
[Node.js](https://nodejs.org/en/)<br>
[Plateform--optional](https://www.apachefriends.org/index.html)<br>
`git clone https://github.com/RuitaoWu/DBMS-Project.git`<br>
`cd DBMS-Project`<br>
`npm install`<br>
run 'npm i express mysql dotenv hbs' if you don't have 'node_modules' folder
- Register, Login, Logout
    - Register and Login are functional
    - Logout is not functional
---
Execute Process<br>
 - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '' //run this in mysql if there has an error<br>
 - Manually create database
    - create a new database on your local PC named 'dbms-proj'<br>
    - create a new table inside the database named 'users'<br>
    - create three column inside the table that are: 'id', 'password', 'username','email','fname','lname'<br>
- Otherwise Execute the SQL(P.S. the following SQL will drop the database first if it exists)
    - ``` 
        DROP DATABASE dbms_proj;
        CREATE DATABASE test;
        CREATE TABLE dbms_proj.users(
            id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            username VARCHAR(30) NOT NULL,
            password VARCHAR(30) NOT NULL,
            email VARCHAR(30) NOT NULL UNIQUE,
            fname VARCHAR(30) NOT NULL,
            lname VARCHAR(30) NOT NULL
        );
     ```
