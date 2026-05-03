/*
  Warnings:

  - You are about to drop the `_ManyStoryToManyUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_id` to the `stories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ManyStoryToManyUser" DROP CONSTRAINT "_ManyStoryToManyUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManyStoryToManyUser" DROP CONSTRAINT "_ManyStoryToManyUser_B_fkey";

-- AlterTable
ALTER TABLE "stories" ADD COLUMN     "author_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ManyStoryToManyUser";

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
