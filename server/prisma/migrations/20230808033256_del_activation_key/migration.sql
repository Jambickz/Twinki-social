/*
  Warnings:

  - You are about to drop the column `activation_key` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_email_username_activation_key_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `activation_key`;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_username_key` ON `users`(`email`, `username`);
