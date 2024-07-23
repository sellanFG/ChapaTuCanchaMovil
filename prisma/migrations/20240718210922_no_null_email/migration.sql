/*
  Warnings:

  - Made the column `email` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "email" SET NOT NULL;
