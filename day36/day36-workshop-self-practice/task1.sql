-- create the posts2 table in mySQL
create table posts2(
	post_id varchar(8) not null,
	comments mediumtext,
	picture mediumblob,
	constraint pk_post_id primary key (post_id)
);