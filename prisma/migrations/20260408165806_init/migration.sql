/*
  Warnings:

  - You are about to drop the column `author_email` on the `stories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stories" DROP CONSTRAINT "stories_author_email_fkey";

-- AlterTable
ALTER TABLE "stories" DROP COLUMN "author_email",
ALTER COLUMN "content" DROP NOT NULL;

-- CreateTable
CREATE TABLE "chapters" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ManyStoryToManyUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ManyStoryToManyUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ManyStoryToManyUser_B_index" ON "_ManyStoryToManyUser"("B");

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyStoryToManyUser" ADD CONSTRAINT "_ManyStoryToManyUser_A_fkey" FOREIGN KEY ("A") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyStoryToManyUser" ADD CONSTRAINT "_ManyStoryToManyUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
