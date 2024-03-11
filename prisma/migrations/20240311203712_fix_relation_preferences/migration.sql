/*
  Warnings:

  - The primary key for the `Preferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sportId` on the `Preferences` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_playerId_sportId_fkey";

-- AlterTable
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_pkey",
DROP COLUMN "sportId",
ADD CONSTRAINT "Preferences_pkey" PRIMARY KEY ("playerId", "answerId");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
