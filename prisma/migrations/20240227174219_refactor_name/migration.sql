/*
  Warnings:

  - You are about to drop the column `teamplateQuestionsId` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the `TeamplateQuestions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionsTemplateId` to the `answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamplateQuestions" DROP CONSTRAINT "TeamplateQuestions_SportId_fkey";

-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_teamplateQuestionsId_fkey";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "teamplateQuestionsId",
ADD COLUMN     "questionsTemplateId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TeamplateQuestions";

-- CreateTable
CREATE TABLE "QuestionsTemplate" (
    "questionsTemplate" SERIAL NOT NULL,
    "Question" VARCHAR(255) NOT NULL,
    "SportId" INTEGER NOT NULL,

    CONSTRAINT "QuestionsTemplate_pkey" PRIMARY KEY ("questionsTemplate")
);

-- AddForeignKey
ALTER TABLE "QuestionsTemplate" ADD CONSTRAINT "QuestionsTemplate_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionsTemplateId_fkey" FOREIGN KEY ("questionsTemplateId") REFERENCES "QuestionsTemplate"("questionsTemplate") ON DELETE RESTRICT ON UPDATE CASCADE;
