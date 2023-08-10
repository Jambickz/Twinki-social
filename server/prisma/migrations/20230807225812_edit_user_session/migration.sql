/*
  Warnings:

  - The primary key for the `usersession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessinId` on the `usersession` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usersession` DROP PRIMARY KEY,
    DROP COLUMN `sessinId`,
    ADD COLUMN `sessionId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sessionId`);
