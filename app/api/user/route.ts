import { prisma } from "@/config/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id") as string;
    const username = req.nextUrl.searchParams.get("username") as string;
    const many = req.nextUrl.searchParams.get("many");
    console.log(userId);

    if (!userId && !username) {
      return NextResponse.json("User id or username is not defined", {
        status: 500,
      });
    }
    let user = null;
    if (many) {
      user = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
            mode: "insensitive",
          },
        },
        include: {
          stories: true,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          stories: true,
          views: { include: { story: true } },
          likes: { include: { story: true } },
        },
      });
    }

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json("User is not found", { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
