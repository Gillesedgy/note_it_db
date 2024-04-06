DROP DATABASE IF EXISTS note_dev;
CREATE DATABASE note_dev; 
-- Connect to database
\c note_dev

DROP TABLE IF EXISTS notes;

 CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT  NOT NULL,
    content TEXT NOT NULL,
    date TEXT  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_bookmark BOOLEAN DEFAULT FALSE
);
COMMIT --confirming and finalizing all my changes in the db
