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
Database  
 - Before run the code make sure you have local database/schema named "dbms"  
 - Before run make sure you have user account "comp440"
 - Execute the following SQL script if there has access denied SQL error  
 - `ALTER USER 'comp440'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass1234'`  
 - User 'comp440' may occurs error if the privilege isn't sufficient  
---
Crruent Feature(s)  
1. New User register
2. log in
3. log out
4. Initialize the database table
5. User can post 2 blogs per day
6. User can only comment blog one time
7. User can't comment his/her own blog
8. Empty prevention
10. Display user blogs with positive comment
12. Display user(s) post most blog on 2020-10-10
13. Display mutual leaderid of user X and Y
14. Display blogs with tag X
15. Display user(s) who never post comment