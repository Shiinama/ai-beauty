CREATE TABLE `userAnalysisUsage` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`usageCount` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
