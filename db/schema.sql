-- Reset and Create Database
DROP DATABASE IF EXIST note_dev
CREATE DATABASE note_dev

-- Connect to database
\c note_dev

-- CREATE TABLE 
 CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIMESTAMP NOT NULL,
    is_bookmark BOOLEAN
);