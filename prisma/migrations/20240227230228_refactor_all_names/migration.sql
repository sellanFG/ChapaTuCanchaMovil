/*
  Warnings:

  - The primary key for the `GameMode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `GameModeDescription` on the `GameMode` table. All the data in the column will be lost.
  - You are about to drop the column `GameModeId` on the `GameMode` table. All the data in the column will be lost.
  - You are about to drop the column `GameModeName` on the `GameMode` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `GameMode` table. All the data in the column will be lost.
  - You are about to drop the column `GameModeId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `SportFieldId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `Question` on the `QuestionsTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `QuestionsTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `GameModeId` on the `SearchParameters` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `SearchParameters` table. All the data in the column will be lost.
  - You are about to drop the column `TeamId` on the `SearchParameters` table. All the data in the column will be lost.
  - The primary key for the `Sport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SportDescription` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `SportImage` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `SportName` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `SportId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membersMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sportPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teamMatch` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sportId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameModeId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameModeDescription` to the `GameMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameModeName` to the `GameMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `GameMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameModeId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportFieldId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `QuestionsTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `QuestionsTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameModeId` to the `SearchParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `SearchParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `SearchParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportDescription` to the `Sport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportImage` to the `Sport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportName` to the `Sport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameMode" DROP CONSTRAINT "GameMode_SportId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_GameModeId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_SportFieldId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_SportId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsTemplate" DROP CONSTRAINT "QuestionsTemplate_SportId_fkey";

-- DropForeignKey
ALTER TABLE "SearchParameters" DROP CONSTRAINT "SearchParameters_GameModeId_fkey";

-- DropForeignKey
ALTER TABLE "SearchParameters" DROP CONSTRAINT "SearchParameters_SportId_fkey";

-- DropForeignKey
ALTER TABLE "SearchParameters" DROP CONSTRAINT "SearchParameters_TeamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_SportId_fkey";

-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_questionsTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_playerId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_teamId_fkey";

-- DropForeignKey
ALTER TABLE "membersMatch" DROP CONSTRAINT "membersMatch_matchId_fkey";

-- DropForeignKey
ALTER TABLE "membersMatch" DROP CONSTRAINT "membersMatch_playerId_teamId_fkey";

-- DropForeignKey
ALTER TABLE "preferences" DROP CONSTRAINT "preferences_answerId_fkey";

-- DropForeignKey
ALTER TABLE "preferences" DROP CONSTRAINT "preferences_playerId_SportId_fkey";

-- DropForeignKey
ALTER TABLE "sportPlayer" DROP CONSTRAINT "sportPlayer_SportId_fkey";

-- DropForeignKey
ALTER TABLE "sportPlayer" DROP CONSTRAINT "sportPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "teamMatch" DROP CONSTRAINT "teamMatch_matchId_fkey";

-- DropForeignKey
ALTER TABLE "teamMatch" DROP CONSTRAINT "teamMatch_playerId_fkey";

-- DropForeignKey
ALTER TABLE "teamMatch" DROP CONSTRAINT "teamMatch_teamId_fkey";

-- DropIndex
DROP INDEX "Match_GameModeId_key";

-- DropIndex
DROP INDEX "Match_SportId_key";

-- AlterTable
ALTER TABLE "GameMode" DROP CONSTRAINT "GameMode_pkey",
DROP COLUMN "GameModeDescription",
DROP COLUMN "GameModeId",
DROP COLUMN "GameModeName",
DROP COLUMN "SportId",
ADD COLUMN     "gameModeDescription" VARCHAR(255) NOT NULL,
ADD COLUMN     "gameModeId" SERIAL NOT NULL,
ADD COLUMN     "gameModeName" VARCHAR(30) NOT NULL,
ADD COLUMN     "sportId" INTEGER NOT NULL,
ADD CONSTRAINT "GameMode_pkey" PRIMARY KEY ("gameModeId");

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "GameModeId",
DROP COLUMN "SportFieldId",
DROP COLUMN "SportId",
ADD COLUMN     "gameModeId" INTEGER NOT NULL,
ADD COLUMN     "sportFieldId" INTEGER NOT NULL,
ADD COLUMN     "sportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsTemplate" DROP COLUMN "Question",
DROP COLUMN "SportId",
ADD COLUMN     "question" VARCHAR(255) NOT NULL,
ADD COLUMN     "sportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SearchParameters" DROP COLUMN "GameModeId",
DROP COLUMN "SportId",
DROP COLUMN "TeamId",
ADD COLUMN     "gameModeId" INTEGER NOT NULL,
ADD COLUMN     "sportId" INTEGER NOT NULL,
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_pkey",
DROP COLUMN "SportDescription",
DROP COLUMN "SportId",
DROP COLUMN "SportImage",
DROP COLUMN "SportName",
ADD COLUMN     "sportDescription" VARCHAR(255) NOT NULL,
ADD COLUMN     "sportId" SERIAL NOT NULL,
ADD COLUMN     "sportImage" VARCHAR(255) NOT NULL,
ADD COLUMN     "sportName" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "Sport_pkey" PRIMARY KEY ("sportId");

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "SportId",
ADD COLUMN     "sportId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "answer";

-- DropTable
DROP TABLE "members";

-- DropTable
DROP TABLE "membersMatch";

-- DropTable
DROP TABLE "player";

-- DropTable
DROP TABLE "preferences";

-- DropTable
DROP TABLE "sportPlayer";

-- DropTable
DROP TABLE "teamMatch";

-- CreateTable
CREATE TABLE "Player" (
    "playerId" SERIAL NOT NULL,
    "playerUserName" VARCHAR(100) NOT NULL,
    "playerPassword" VARCHAR(100) NOT NULL,
    "playerFirstName" VARCHAR(100) NOT NULL,
    "playerLastName" VARCHAR(100) NOT NULL,
    "playerPhoneNumber" CHAR(9) NOT NULL,
    "playerEmail" VARCHAR(100),
    "playerBirthDate" DATE NOT NULL,
    "playerImage" VARCHAR(255) NOT NULL,
    "playerGender" VARCHAR(20) NOT NULL,
    "playerDistrict" VARCHAR(50) NOT NULL,
    "playerRegistrationDate" TIMESTAMPTZ NOT NULL,
    "playerAvailability" BOOLEAN NOT NULL DEFAULT false,
    "playerSubscription" BOOLEAN NOT NULL DEFAULT false,
    "playerSearchStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answerId" SERIAL NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "questionsTemplateId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "SportPlayer" (
    "sportId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SportPlayer_pkey" PRIMARY KEY ("sportId","playerId")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "playerId" INTEGER NOT NULL,
    "sportId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("playerId","sportId","answerId")
);

-- CreateTable
CREATE TABLE "Members" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "memberRole" VARCHAR(1) NOT NULL,
    "memberRegistrationDate" TIMESTAMPTZ NOT NULL,
    "memberStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("playerId","teamId")
);

-- CreateTable
CREATE TABLE "TeamMatch" (
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "statusNFU" BOOLEAN NOT NULL DEFAULT false,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("teamId","matchId")
);

-- CreateTable
CREATE TABLE "MembersMatch" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "MembersMatch_pkey" PRIMARY KEY ("playerId","teamId","matchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatch_playerId_key" ON "TeamMatch"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_sportId_key" ON "Match"("sportId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_gameModeId_key" ON "Match"("gameModeId");

-- AddForeignKey
ALTER TABLE "GameMode" ADD CONSTRAINT "GameMode_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("gameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sportFieldId_fkey" FOREIGN KEY ("sportFieldId") REFERENCES "SportField"("sportFieldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("gameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsTemplate" ADD CONSTRAINT "QuestionsTemplate_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionsTemplateId_fkey" FOREIGN KEY ("questionsTemplateId") REFERENCES "QuestionsTemplate"("questionsTemplateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPlayer" ADD CONSTRAINT "SportPlayer_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPlayer" ADD CONSTRAINT "SportPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_playerId_sportId_fkey" FOREIGN KEY ("playerId", "sportId") REFERENCES "SportPlayer"("playerId", "sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersMatch" ADD CONSTRAINT "MembersMatch_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "Members"("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersMatch" ADD CONSTRAINT "MembersMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;
