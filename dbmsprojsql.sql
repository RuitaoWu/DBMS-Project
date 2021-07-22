-- that will drop the database frist if duplicate 
drop database dbms_proj;
create database dbms_proj;
create table dbms_proj.users(
	id int(11) primary key not null auto_increment,
    username varchar(30) not null,
    password varchar(30) not null,
    email varchar(30) not null unique,
    fname varchar(30) not null,
    lname varchar(30) not null
);