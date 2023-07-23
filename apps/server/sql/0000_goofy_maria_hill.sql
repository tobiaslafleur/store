CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`uuid` binary(16) NOT NULL,
	`email` varchar(255) NOT NULL,
	`first_name` varchar(35) NOT NULL,
	`last_name` varchar(35) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE INDEX `uuid_index` ON `users` (`uuid`);--> statement-breakpoint
CREATE INDEX `email_index` ON `users` (`email`);