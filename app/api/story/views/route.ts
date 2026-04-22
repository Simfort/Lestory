import { prisma } from "@/config/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const user = searchParams.get("user");
    const ip = req.headers.get("x-forwarded-for") as string;
    if (!id || !user) {
      return NextResponse.json("Id is not defined", { status: 500 });
    }
    let story = null;
    const isViewed = await prisma.storyView.findFirst({
      where: { storyId: Number(id), OR: [{ ip }, { userId: user }] },
      include: {
        story: {
          include: {
            author: true,
            views: true,
            likes: true,
          },
        },
      },
    });
    if (isViewed) {
      story = isViewed.story;
    } else {
      const createdView = await prisma.storyView.create({
        data: {
          storyId: Number(id),
          userId: user,
          ip: ip || "",
        },
        include: {
          story: {
            include: {
              author: true,
              views: true,
              likes: true,
            },
          },
        },
      });
      story = createdView.story;
    }

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
