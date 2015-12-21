USE DATABASE outdoorbuddies;

CREATE TABLE UserProfile ( 
	user_id INT NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	passwd VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	dob DATE,
	gender CHAR(1),
	mobile CHAR(10),
	address VARCHAR(255),
	imageurl VARCHAR(255),
	createddate DATE,
	CONSTRAINT pk_UserID PRIMARY KEY(user_id)
);

INSERT INTO UserProfile VALUES(NULL,"sridhar","somasani","sridhar_somasani","sridhar","sridhar_somasani@gmail.com","1990-1-1","M","6107515373","University Place","images/male.jpg", CURRENT_DATE);
INSERT INTO UserProfile VALUES(NULL,"adithya", "tallap",  "adithya_tallap", "adithya", "adithya_tallap@gmail.com", "1990-1-1", "M", "6107515373", "Lamar Place", "images/male.jpg", CURRENT_DATE);
INSERT INTO UserProfile VALUES(NULL,"shiva", "ragi",  "shiva_ragi", "shiva", "shiva_ragi@gmail.com", "1990-1-1", "M", "6107515373", "Lamar Place", "images/male.jpg", CURRENT_DATE);
INSERT INTO UserProfile VALUES(NULL,"abhinav", "kotha",  "abhinav_kotha", "abhinav", "abhinav_kotha@gmail.com", "1990-1-1", "M", "6107515373", "University Place", "images/male.jpg", CURRENT_DATE);
INSERT INTO UserProfile VALUES(NULL,"pranith", "thipparthi",  "pranith_thipparthi", "pranith", "pranith_thipparthi@gmail.com", "1990-1-1", "M", "6107515373", "Lamar Place", "images/male.jpg", CURRENT_DATE);


DROP PROCEDURE IF EXISTS usp_AddNewUser;

DELIMITER $$
CREATE PROCEDURE usp_AddNewUser(IN fname varchar(255), 
	IN lname VARCHAR(255),
	IN	uname VARCHAR(255),
	IN	passwd VARCHAR(255),
	IN	_email VARCHAR(255),
	IN	_dob VARCHAR(255),
	IN	_gender CHAR(1),
	IN	_mobile CHAR(10),
	IN	_address VARCHAR(255),
	IN	_imageurl VARCHAR(255)
 )
 BEGIN
	INSERT INTO UserProfile (user_id,firstname, lastname, username, passwd, email, dob, gender, mobile, address, imageurl, createddate) VALUES(NULL, fname, lname, uname, passwd, _email, _dob, _gender, _mobile, _address, _imageurl, CURRENT_DATE);
	SELECT * FROM UserProfile WHERE username = uname AND email = _email;
 END $$
 DELIMITER ;
 # SHOW PROCEDURE STATUS LIKE '%'
 CALL usp_AddNewUser('test','test','test','test','test@test.com','2014-11-03','M','1234567896','No Clue','images/male.jpg');
 
 CREATE TABLE Games ( 
	game_id INT NOT NULL AUTO_INCREMENT,
	game_name VARCHAR(255) NOT NULL,
	game_desc VARCHAR(255) NOT NULL,
	create_date DATE,
	CONSTRAINT pk_GameID PRIMARY KEY(game_id)
);


CREATE TABLE GameEvents ( 
	event_id INT NOT NULL AUTO_INCREMENT,
	game_id INT NOT NULL,
	isCompleted TINYINT NOT NULL DEFAULT 0,
	event_date DATE,
	event_start_time VARCHAR(5) NOT NULL,
	event_end_time VARCHAR(5) NOT NULL,
	event_place VARCHAR(255) NOT NULL,
	event_address VARCHAR(255) NOT NULL,
	create_date DATE,
	modified_date DATE,
	CONSTRAINT pk_EventID PRIMARY KEY(event_id),
	CONSTRAINT fk_GameID FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

CREATE TABLE EventParticipants(
	event_participant_id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	user_id INT NOT NULL,
	accept TINYINT NOT NULL DEFAULT 0,
	is_attended TINYINT NOT NULL DEFAULT 0,
	feedback VARCHAR(255),
	expertise INT DEFAULT 0,
	CONSTRAINT pk_EventParticipantsID PRIMARY KEY(event_participant_id),
	CONSTRAINT fk_EventParticipants_UserID FOREIGN KEY(user_id) REFERENCES UserProfile(user_id),
	CONSTRAINT fk_EventParticipants_EventID FOREIGN KEY(event_id) REFERENCES GameEvents(event_id)	
);

CREATE TABLE EventGallery(
	gallery_id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	description VARCHAR(255),
	image_url VARCHAR(255) NOT NULL,
	CONSTRAINT pk_EventGalleryID PRIMARY KEY(gallery_id),
	CONSTRAINT fk_EventGallery_EventID FOREIGN KEY(event_id) REFERENCES GameEvents(event_id)
);

INSERT INTO Games VALUES(NULL, "Football", "football description", CURRENT_DATE);
INSERT INTO Games VALUES(NULL, "Basketball", "basketball description", CURRENT_DATE);
INSERT INTO Games VALUES(NULL, "Cricket", "cricket description", CURRENT_DATE);
INSERT INTO Games VALUES(NULL, "Tennis", "tennis description", CURRENT_DATE);

DROP PROCEDURE IF EXISTS usp_AddNewEvent;

DELIMITER $$
CREATE PROCEDURE usp_AddNewEvent(
	IN eventdate varchar(255), 
	IN starttime VARCHAR(255),
	IN	endtime VARCHAR(255),
	IN	gametype VARCHAR(255),
	IN	place VARCHAR(255),
	IN	address VARCHAR(255)
 )
 BEGIN
 	DECLARE event_game_id INT;
 	DECLARE event_current_id INT DEFAULT -1;
 	SET event_game_id = -1;
 	SELECT game_id into @event_game_id from Games WHERE game_name = gametype;
	INSERT INTO GameEvents (event_id,game_id, isCompleted, event_date, event_start_time, event_end_time, event_place, event_address, create_date, modified_date) VALUES(NULL, @event_game_id, 0, eventdate, starttime, endtime, place, address, CURRENT_DATE, CURRENT_DATE);
	SELECT LAST_INSERT_ID();
 END $$
 DELIMITER ;

CALL usp_AddNewEvent('2014-11-03','10 AM','11 AM','Football','placeddd','addressss');

DROP PROCEDURE IF EXISTS usp_AddNewEvent;

DELIMITER $$
CREATE PROCEDURE usp_AddNewEvent(
	IN eventdate varchar(255), 
	IN starttime VARCHAR(255),
	IN	endtime VARCHAR(255),
	IN	gametype VARCHAR(255),
	IN	place VARCHAR(255),
	IN	address VARCHAR(255)
 )
 BEGIN
 	DECLARE event_game_id INT;
 	DECLARE event_current_id INT DEFAULT -1;
 	SET event_game_id = -1;
 	SELECT game_id into @event_game_id from Games WHERE game_name = gametype;
	INSERT INTO GameEvents (event_id,game_id, isCompleted, event_date, event_start_time, event_end_time, event_place, event_address, create_date, modified_date) VALUES(NULL, @event_game_id, 0, eventdate, starttime, endtime, place, address, CURRENT_DATE, CURRENT_DATE);
	SELECT LAST_INSERT_ID();
 END $$
 DELIMITER ;

CALL usp_AddNewEvent('2014-11-03','10 AM','11 AM','Football','placeddd','addressss');

DELIMITER $$
CREATE PROCEDURE usp_GetScheduleEvents(
	IN userid INT
 )
 BEGIN
	SELECT ge.event_id, ge.game_id, ge.isCompleted, ge.event_start_time, ge.event_end_time, ge.event_date, ge.event_place, ge.event_address, ep.accept, ep.is_attended FROM gameevents ge inner join eventparticipants ep on ge.event_id = ep.event_id WHERE ep.user_id = userid; 
 END $$
 DELIMITER ;