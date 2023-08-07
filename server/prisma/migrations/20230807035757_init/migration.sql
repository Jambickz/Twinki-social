-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activation_key` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `last_online` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_offline` BOOLEAN NOT NULL,
    `profile_name` VARCHAR(191) NULL,
    `profile_picture_id` INTEGER NULL,
    `bio` VARCHAR(191) NULL,
    `verification` BOOLEAN NOT NULL DEFAULT false,

    INDEX `users_user_id_username_email_idx`(`user_id`, `username`, `email`),
    UNIQUE INDEX `users_email_username_activation_key_key`(`email`, `username`, `activation_key`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `ip` VARCHAR(120) NULL,
    `browser` VARCHAR(50) NULL,
    `os` VARCHAR(50) NULL,
    `device` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_followers` (
    `folowing_id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`folowing_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `permissions` JSON NOT NULL,

    UNIQUE INDEX `roles_role_name_key`(`role_name`),
    INDEX `roles_role_id_idx`(`role_id`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uploads` (
    `upload_id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_type` INTEGER NOT NULL,
    `file_size` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `uploads_upload_id_idx`(`upload_id`),
    PRIMARY KEY (`upload_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `sender_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `caption` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `upload_count` INTEGER NOT NULL DEFAULT 0,

    INDEX `posts_post_id_user_id_sender_id_idx`(`post_id`, `user_id`, `sender_id`),
    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts_uploads` (
    `upload_post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `upload_id` INTEGER NOT NULL,

    PRIMARY KEY (`upload_post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reposts` (
    `repost_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `reposts_post_id_idx`(`post_id`),
    PRIMARY KEY (`repost_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `attachment_count` INTEGER NOT NULL DEFAULT 0,
    `deleted_at` DATETIME(3) NULL,

    INDEX `comments_post_id_idx`(`post_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `likes_post_id_idx`(`post_id`),
    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profile_picture_id_fkey` FOREIGN KEY (`profile_picture_id`) REFERENCES `uploads`(`upload_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_followers` ADD CONSTRAINT `users_followers_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_followers` ADD CONSTRAINT `users_followers_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts_uploads` ADD CONSTRAINT `posts_uploads_upload_id_fkey` FOREIGN KEY (`upload_id`) REFERENCES `uploads`(`upload_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts_uploads` ADD CONSTRAINT `posts_uploads_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
