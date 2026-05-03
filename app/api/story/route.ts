import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams;

    const storyId = search.get("id");
    const storyTitle = search.get("title") as string;
    const many = search.get("many");

    if (!storyId && !storyTitle) {
      return NextResponse.json("Id is invalid", { status: 404 });
    }
    let story = null;

    if (many) {
      story = await prisma.story.findMany({
        where: {
          title: { contains: storyTitle, mode: "insensitive" },
        },
        include: {
          author: {
            select: {
              image: true,
              username: true,
            },
          },
          views: true,
          likes: true,
        },
        orderBy: [{ views: { _count: "desc" } }],
      });
    } else {
      story = await prisma.story.findUnique({
        where: { id: Number(storyId) },
        include: {
          author: {
            select: {
              image: true,
              username: true,
            },
          },
          chapters: true,
          views: true,
          likes: true,
        },
      });
    }

    if (story) {
      return NextResponse.json(story, {
        status: 200,
      });
    }
    return NextResponse.json(null, {
      status: 404,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
