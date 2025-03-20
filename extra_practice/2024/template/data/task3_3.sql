-- TODO Task 3
create table orders(
	order_id varchar(26) not null,
	date date,
	name varchar(128),
	address varchar(128),
	priority boolean,
	comments text,
	constraint pk_order_id primary key (order_id)
);


create table line_items(
	id int auto_increment not null,
	product_id varchar(24),
	name varchar(128),
	quantity int,
	price float,
	order_id varchar(26),
	constraint pk_id primary key (id),
	constraint fk_order_id foreign key (order_id) references orders(order_id)
);