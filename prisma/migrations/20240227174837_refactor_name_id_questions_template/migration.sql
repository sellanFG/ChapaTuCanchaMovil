/*
  Warnings:

  - The primary key for the `QuestionsTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionsTemplate` on the `QuestionsTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_questionsTemplateId_fkey";

-- AlterTable
ALTER TABLE "QuestionsTemplate" DROP CONSTRAINT "QuestionsTemplate_pkey",
DROP COLUMN "questionsTemplate",
ADD COLUMN     "questionsTemplateId" SERIAL NOT NULL,
ADD CONSTRAINT "QuestionsTemplate_pkey" PRIMARY KEY ("questionsTemplateId");

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionsTemplateId_fkey" FOREIGN KEY ("questionsTemplateId") REFERENCES "QuestionsTemplate"("questionsTemplateId") ON DELETE RESTRICT ON UPDATE CASCADE;
