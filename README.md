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
---  
Database<br>
 - Before run the code make sure you have local database/schema named "dbms"  
 - Execute the following SQL script if there has access denied SQL error  
 - `ALTER USER 'comp440'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass1234'`  
 - User 'comp440' may occurs error if the privilege isn't sufficient  
Crruent Feature(s)  
1. New User register
2. log in
3. log out
4. Initialize the database table
5. User can post 2 blogs per day
6. User can only comment blog one time
7. User can't comment his/her own blog
8. Empty prevention
---
New Update(s)
1. Search user with different condition
2. Display blogs contains specific tag
3. Return the user who posted most blogs on date (e.g. 2021-08-05 or any other date)