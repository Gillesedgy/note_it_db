-- Reset and Create Database
DROP DATABASE IF EXIST note_app
CREATE DATABASE note_app

-- Connect to database
\c note_dev

DROG TABLE IF EXIST notes
-- CREATE TABLE 
 CREATE TABLE notes (
    id SERIAL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content VARCHAR(325) NOT NULL,
    date DATE NOT NULL,
    time TIMESTAMP NOT NULL,
    -- image TEXT DEFAULT 'https://dummyimage.com/350x400/6e6c6e/e9e9f5.png&text=No+Image',
    is_bookmark BOOLEAN
);