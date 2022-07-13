/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

/* Clears old tables */
DROP TABLE IF EXISTS
Users, Books, User_Books
;


/* Creates our SQL Database */
CREATE TABLE Users (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) UNIQUE NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE Books (
  ISBN char(13) UNIQUE PRIMARY KEY,
  title varchar(255) NOT NULL
);

CREATE TABLE User_Books (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_user int NOT NULL REFERENCES Users(id),
    ISBN_book char(13) NOT NULL REFERENCES Books(ISBN)
);


-- SELECT @@auto_increment_increment;
SET auto_increment_increment = 1;
-- SELECT @@auto_increment_offset;
SET auto_increment_offset = 1;


/* SAMPLE DATA */
INSERT INTO Users (username, email, password) VALUES
    ("elliot", "elliot@gmail.com", "$2b$10$1c9Rj6mZGRyE6xiB69JQT.nAUN33yrOJ1409SnQS/qlklWZb48Ckm"),
    ("lucia", "lucia@gmail.com", "$2b$10$KOGOBt5i0fjSLBoZBFeiReyDWctK2gZPtCpRRaxa9OBor.Dp61jfy")
;

INSERT INTO Books (ISBN, title) VALUES
    ('1111111111', "title1"),
    ('0123456789', "title0"),
    ('2222222222', "title2"),
    ('3333333333', "title3"),
    ('4444444444', "title4"),
    ('5555555555', "title5"),
    ('6666666666', "title6"),
    ('1111111111111', "title11"),
    ('7777777777777', "title7"),
    ('0888888888888', "title8")
;