-- Connect To Database
\c note_dev;

-- ADD INFORMATION INTO TABLE
INSERT INTO notes (title, content, date, time, is_bookmark) VALUES ('Proposal', 'User Stories minimum, describing what a user can expect to see/do when using your application

Wireframes, lo-fidelity visual representation of your front-end using whatever tools you choose. (even pencil and paper)
ERD, for your back-end. Only one table is required, but you must add all columns that are expected for each entry to your table(what info does an entry have?) For example: a user may have id, name, email, phone', '2/7/2023', 2:15, true);

