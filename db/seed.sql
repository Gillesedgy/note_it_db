-- Connect To Database
\c note_dev;

-- ADD INFORMATION INTO TABLE

--  User Table
INSERT INTO users (username, email, password_hash, image_url) VALUES('user1', 'user1@example.com', 'hashed_password_1', 'http://example.com/images/user1.jpg'),
('user2', 'user2@example.com', 'hashed_password_2', 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text'),
('user3', 'user3@example.com', 'hashed_password_3', 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image');


--Notes Table
INSERT INTO notes (user_id, title, content, date, is_bookmark) VALUES
 (1,'Back-End', 'Setting up my backend server with a few routes ', '2/8/2023', true),
(2,'DAY 1', 'Setting up my backend server with a few routes ', '2/8/2023', true),
(3, 'Don`t forget to Fix the SEED Date  ','uh hohhhh', '2/8/2023',  false),
(1,'^_^', 'Call Pepppino, the neighbor`s kid is back', '2/8/2023', true),
(2,'SHEESH', 'Don`t forget to check for rogue commas... they can ruin lives ', '2/9/2023',  false),
(3,'Finally', 'Bacend Full CRUD ', '2/10/2023', true),
(1,'TLDR', 'Be transparent about your daily work ', '2/13/2023',  true),
(2,'SIGH', 'Know when to STOP and take a REST ','2/14/2023',  true),
(3,'-_-', 'Don`t work from your bed', '2/14/2023',  false),
(1,'Health', 'Dont forget to exercise ', '2/8/2023',true),
(2,'That`s what she said', 'Don`t let yesterday`s failures and mistakes stop you from chasing success today', '2/8/2023',  true),
(3,'PT', 'Reschdule Accupuncture ', '2/15/2023', false);

