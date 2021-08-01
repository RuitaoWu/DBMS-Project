# DBMS-Project<br>
### Requirement<br>
[Node.js](https://nodejs.org/en/)<br>
[Plateform--optional](https://www.apachefriends.org/index.html)<br>
---  
```
git clone https://github.com/RuitaoWu/DBMS-Project.git  
cd DBMS-Project  
npm install  
```
run the follow command if you don't have 'node_modules' folder  
`npm i express mysql dotenv hbs`  
---  
Execute Process<br>
 - Execute the following SQL script 
 - `ALTER USER 'comp440'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass1234'`  
 - Before run the code make sure you have local database/schema named "dbms"
 Crruent Feature(s)  
1. New User register
2. log in
3. log out
4. Initialize the database table
5. User can post 2 blogs per day
6. User can only comment blog one time
7. User can't comment his/her own blog
8. Empty login/register prevention