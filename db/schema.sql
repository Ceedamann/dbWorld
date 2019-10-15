CREATE DATABASE games_db;
USE games_db;
CREATE TABLE games
(
	rank INT NOT NULL,
	name varchar(255) NOT NULL,	
	platform varchar(255) NOT NULL,	
	year YEAR NULL,
	genre varchar(255) NOT NULL,
	publisher varchar(255) NOT NULL,
	na_Sales DECIMAL(10,4) NULL,
	eu_Sales DECIMAL(10,4) NULL,
	jp_Sales DECIMAL(10,4) NULL,
	other_Sales DECIMAL(10,4) NULL,
	global_Sales DECIMAL(10,4) NULL,
	PRIMARY KEY (rank)
);