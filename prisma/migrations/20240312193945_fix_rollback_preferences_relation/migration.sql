/*
  Warnings:

  - The primary key for the `Preferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `SportPlayer` table. All the data in the column will be lost.
  - Added the required column `sportId` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_playerId_fkey";

-- AlterTable
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_pkey",
ADD COLUMN     "sportId" INTEGER NOT NULL,
ADD CONSTRAINT "Preferences_pkey" PRIMARY KEY ("playerId", "answerId", "sportId");

-- AlterTable
ALTER TABLE "SportPlayer" DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_playerId_sportId_fkey" FOREIGN KEY ("playerId", "sportId") REFERENCES "SportPlayer"("playerId", "sportId") ON DELETE CASCADE ON UPDATE CASCADE;
