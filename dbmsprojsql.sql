-- that will drop the database frist if duplicate 
drop database test;
create database test;
create table test.users(
	id int(11) primary key not null,
    username varchar(30) not null,
    password varchar(30) not null,
    email varchar(30) not null unique,
    fname varchar(30) not null,
    lname varchar(30) not null
);