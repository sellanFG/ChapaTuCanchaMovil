-- DropForeignKey
ALTER TABLE "TeamMatch" DROP CONSTRAINT "TeamMatch_playerId_fkey";

-- AlterTable
ALTER TABLE "TeamMatch" ALTER COLUMN "playerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE SET NULL ON UPDATE CASCADE;
