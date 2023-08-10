/*
  Warnings:

  - The primary key for the `usersession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `usersession` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usersession` DROP PRIMARY KEY,
    DROP COLUMN `sessionId`,
    ADD COLUMN `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`session_id`);
