-- DropForeignKey
ALTER TABLE `user_session` DROP FOREIGN KEY `user_session_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
