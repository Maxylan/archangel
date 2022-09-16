CREATE TABLE `arch_permissions` (
	`id` MEDIUMINT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(32) NOT NULL UNIQUE,
	`level` TINYINT unsigned NOT NULL UNIQUE,
    `require_pswd` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);