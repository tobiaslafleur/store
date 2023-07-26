/*
  Warnings:

  - You are about to alter the column `url` on the `product_images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `image` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[uuid]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `product_images` DROP FOREIGN KEY `product_images_product_id_fkey`;

-- DropIndex
DROP INDEX `users_email_index` ON `users`;

-- DropIndex
DROP INDEX `users_uuid_index` ON `users`;

-- AlterTable
ALTER TABLE `product_images` MODIFY `product_id` BINARY(16) NOT NULL,
    MODIFY `url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `products_uuid_key` ON `products`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- CreateIndex
CREATE INDEX `users_email_uuid_idx` ON `users`(`email`, `uuid`);

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `product_images` RENAME INDEX `product_id_index` TO `product_images_product_id_idx`;

-- RenameIndex
ALTER TABLE `products` RENAME INDEX `products_uuid_index` TO `products_uuid_idx`;
