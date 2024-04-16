DROP DATABASE IF EXISTS note_dev;
CREATE DATABASE note_dev; 
-- Connect to database
\c note_dev

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP
);


DROP TABLE IF EXISTS notes;

 CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title TEXT  NOT NULL,
    content TEXT NOT NULL,
    -- date TEXT  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_bookmark BOOLEAN DEFAULT FALSE
);




COMMIT --confirming and finalizing all my changes in the db
