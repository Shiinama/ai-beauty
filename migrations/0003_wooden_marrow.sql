ALTER TABLE `posts` ADD `locale` text DEFAULT 'en' NOT NULL;

UPDATE `posts` SET `locale` = 'en' WHERE `locale` IS NULL;

