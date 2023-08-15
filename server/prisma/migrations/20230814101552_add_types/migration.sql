/*
  Warnings:

  - You are about to alter the column `activation_code` on the `activations_code` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `file_name` on the `uploads` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `uploads` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `uploads` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `profile_name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `bio` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(160)`.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `uploads` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `roles_role_name_key` ON `roles`;

-- AlterTable
ALTER TABLE `activations_code` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `activation_code` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `message` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `posts` MODIFY `caption` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `role_name`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `uploads` DROP COLUMN `file_name`,
    DROP COLUMN `file_size`,
    DROP COLUMN `file_type`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL,
    MODIFY `url` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `username` VARCHAR(15) NOT NULL,
    MODIFY `password` VARCHAR(128) NOT NULL,
    MODIFY `profile_name` VARCHAR(50) NULL,
    MODIFY `bio` VARCHAR(160) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `roles_name_key` ON `roles`(`name`);
