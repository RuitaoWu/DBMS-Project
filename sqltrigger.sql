DROP TRIGGER IF EXISTS `dbms`.`blogs_BEFORE_INSERT`;
DELIMITER $$
USE `dbms`$$
CREATE DEFINER=`comp440`@`localhost` TRIGGER `blogs_BEFORE_INSERT` BEFORE INSERT ON `blogs` FOR EACH ROW BEGIN
	declare rowcount int;
	SELECT COUNT(*) INTO rowcount FROM blogs WHERE userid=NEW.userid AND pdate=new.pdate;
    IF(rowcount>=2)THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You cannot post more than two blogs per day!Please try tomorrow.'; 
	 END IF;
END$$
DELIMITER ;
