
CREATE DATABASE recipes_app;
USE recipes_app;

-- Users Table

CREATE TABLE Users (
id INT AUTO_INCREMENT Primary Key,
email VARCHAR(255) UNIQUE,
password VARCHAR(255)
);

-- Recipes Table

CREATE TABLE Recipes (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255),
ingredients TEXT,
instructions TEXT
);

INSERT INTO Users (email,password)
VALUES ('sed@gmail.com','BYE123')

INSERT INTO Recipes (title, ingredients, instructions)
VALUES ('pizza','salt, flower, sauce','step1, step2')