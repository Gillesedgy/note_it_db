DROP DATABASE IF EXISTS note_dev;
CREATE DATABASE note_dev; 
-- Connect to database
\c note_dev

DROP TABLE IF EXISTS notes;

 CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content VARCHAR(325) NOT NULL,
    date TEXT,
    time TIME,
    is_bookmark BOOLEAN
);