-- Connect To Database
\c note_dev;

-- ADD INFORMATION INTO TABLE
INSERT INTO notes (title, content, date, time, is_bookmark) VALUES ('Back-End', 'Setting up my backend server with a few routes ', '2/8/2023', '11:10', true),
('DAY 1', 'Setting up my backend server with a few routes ', '2/8/2023', '11:10', true),
('', 'Don`t forget to Fix the SEED Date  ', '2/8/2023', '1:35', false),
('^_^', 'Call Pepppino, the neighbor`s kid is back', '2/8/2023', '11:10', true),
('SHEESH', 'Don`t forget to check for rogue commas... they can ruin lives ', '2/9/2023', '3:30', false),
('Finally', 'Bacend Full CRUD ', '2/10/2023', '12:00', true),
('TLDR', 'Be transparent about your daily work ', '2/13/2023', '11:10', true),
('SIGH', 'Know when to STOP and take a REST ', '', '4:26', true),
('-_-', 'Don`t work from your bed', '2/14/2023', '7:28', false),
('Health', 'Dont forget to exercise ', '2/8/2023', '11:10', true),
('That`s what she said', 'Don`t let yesterday`s failures and mistakes stop you from chasing success today', '2/8/2023', '11:10', true),
('PT', 'Reschdule Accupuncture ', '2/15/2023', '9:10', false);

