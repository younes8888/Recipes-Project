
CREATE DATABASE recipes_app;
USE recipes_app;

-- Users Table

CREATE TABLE Users (
id: INT, Primary Key, Auto Increment,
email: VARCHAR(255), Unique,
password: VARCHAR(255)
);



-- Recipes Table

CREATE TABLE Recipes (
id: INT, Primary Key, Auto Increment,
title: VARCHAR(255),
ingredients: TEXT,
instructions: TEXT
);

INSERT INTO Users (email,password)
VALUES ('sed@gmail.com','BYE123')

INSERT INTO Recipes (title, ingredients, instructions)
VALUES ('pizza','salt, flower, sauce','step1, step2')