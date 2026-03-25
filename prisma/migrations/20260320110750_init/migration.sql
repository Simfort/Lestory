-- CreateTable
CREATE TABLE "stories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "author_email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_author_email_fkey" FOREIGN KEY ("author_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
