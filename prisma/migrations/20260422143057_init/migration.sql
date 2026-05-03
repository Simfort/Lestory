/*
  Warnings:

  - You are about to drop the column `author_id` on the `stories` table. All the data in the column will be lost.
  - Added the required column `author_email` to the `stories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stories" DROP CONSTRAINT "stories_author_id_fkey";

-- AlterTable
ALTER TABLE "stories" DROP COLUMN "author_id",
ADD COLUMN     "author_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_author_email_fkey" FOREIGN KEY ("author_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
