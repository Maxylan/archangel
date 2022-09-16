CREATE TABLE `arch_usermeta` (
	`meta_id` MEDIUMINT unsigned NOT NULL AUTO_INCREMENT,
	`user_id` MEDIUMINT unsigned NOT NULL UNIQUE,
	`meta_key` VARCHAR(128) NOT NULL,
	`meta_value` VARCHAR(1024),
	`created` DATE NOT NULL,
	`updated` DATE NOT NULL,
	PRIMARY KEY (`meta_id`)
);