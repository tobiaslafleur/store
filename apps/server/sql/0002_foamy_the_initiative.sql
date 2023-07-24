CREATE TABLE `products` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`uuid` binary(16) NOT NULL,
	`sku` varchar(12) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
DROP INDEX `uuid_index` ON `users`;--> statement-breakpoint
DROP INDEX `email_index` ON `users`;--> statement-breakpoint
CREATE INDEX `products_uuid_index` ON `products` (`uuid`);--> statement-breakpoint
CREATE INDEX `users_uuid_index` ON `users` (`uuid`);--> statement-breakpoint
CREATE INDEX `users_email_index` ON `users` (`email`);