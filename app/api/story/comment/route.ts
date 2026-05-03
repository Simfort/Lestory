import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, storyId, authorId, comment_id } = await req.json();
    if (!content || !storyId || !authorId)
      return NextResponse.json("Not story or content or author", {
        status: 500,
      });
    const comment = await prisma.comment.create({
      data: {
        content,
        storyId,
        authorId,
        comment_id,
      },
    });
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const storyId = searchParams.get("storyId");
    const filter = searchParams.get("filter");
    console.log(filter);
    if (!storyId)
      return NextResponse.json("Story id is not defined", { status: 500 });
    let comments = null;
    const limit = 10;
    let skip = 0;
    if (page) {
      skip = (+page - 1) * limit;
    }

    if (filter === "popular") {
      comments = await prisma.comment.findMany({
        where: {
          storyId: +storyId,
          comment_id: null,
        },
        include: {
          likes: true,
          answers: {
            include: {
              likes: true,
              author: true,
            },
          },
          author: true,
        },
        orderBy: {
          likes: {
            _count: "asc",
          },
        },
        take: limit,
        skip: skip,
      });
    } else if (filter === "new") {
      comments = await prisma.comment.findMany({
        where: {
          storyId: +storyId,
          comment_id: null,
        },
        include: {
          likes: true,
          answers: {
            include: {
              likes: true,
              author: true,
            },
          },
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: skip,
      });
    } else {
      comments = await prisma.comment.findMany({
        where: {
          storyId: +storyId,
          comment_id: null,
        },
        include: {
          likes: true,
          answers: {
            include: {
              likes: true,
              author: true,
            },
          },
          author: true,
        },
        take: limit,
        skip: skip,
      });
    }
    if (!comments) {
      return NextResponse.json([], { status: 404 });
    } else {
      const totalCount = await prisma.comment.count({
        where: { storyId: +storyId },
      });
      const hasMore = skip + comments.length < totalCount;
      return NextResponse.json(
        {
          comments,
          pagination: {
            page: Number(page) || 1,
            hasMore,
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
