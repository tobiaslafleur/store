CREATE TABLE `product_images` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_id` int NOT NULL,
	`url` varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `products` ADD `image` varchar(255);--> statement-breakpoint
CREATE INDEX `product_id_index` ON `product_images` (`product_id`);--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;