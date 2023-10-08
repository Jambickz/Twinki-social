/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `posts_uploads` DROP FOREIGN KEY `posts_uploads_post_id_fkey`;

-- DropTable
DROP TABLE `posts`;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `caption` VARCHAR(255) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `upload_count` INTEGER NOT NULL DEFAULT 0,

    INDEX `post_id_user_id_sender_id_idx`(`id`, `user_id`, `sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts_uploads` ADD CONSTRAINT `posts_uploads_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
