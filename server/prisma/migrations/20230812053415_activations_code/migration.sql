-- CreateTable
CREATE TABLE `activations_code` (
    `code_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `activation_code` VARCHAR(191) NOT NULL,
    `expiry_time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `activations_code_email_key`(`email`),
    INDEX `activations_code_email_idx`(`email`),
    PRIMARY KEY (`code_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
