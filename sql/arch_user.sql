CREATE TABLE `arch_users` (
	`id` MEDIUMINT unsigned NOT NULL AUTO_INCREMENT,
	`uid` BIGINT unsigned NOT NULL UNIQUE,
	`tag` SMALLINT unsigned,
	`username` VARCHAR(64),
	`first_name` VARCHAR(64),
	`last_name` VARCHAR(64),
	`gender` BIT,
    `pswd` VARCHAR(255),
	PRIMARY KEY (`id`)
);