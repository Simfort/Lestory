import { nextAuthConfig } from "@/config/nextauth";
import { prisma } from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get("storyId");

    const session = await getServerSession(nextAuthConfig);

    if (!session) {
      return NextResponse.json("Is not auth ", { status: 401 });
    }
    if (!storyId) {
      return NextResponse.json("Story is not defined", { status: 500 });
    }

    const ip = req.headers.get("x-forwarded-for") as string;
    const like = await prisma.storyLike.findFirst({
      where: { storyId: Number(storyId) },
    });
    if (like) {
      return NextResponse.json({ like: false }, { status: 200 });
    }
    await prisma.storyLike.create({
      data: {
        storyId: Number(storyId),
        ip: ip || "",
        userId: (session.user as { id: string }).id,
      },
    });
    return NextResponse.json({ like: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
export async function GET(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get("storyId");

    const session = await getServerSession(nextAuthConfig);

    if (!session) {
      return NextResponse.json("Is not auth ", { status: 401 });
    }
    if (!storyId) {
      return NextResponse.json("Story is not defined", { status: 500 });
    }
    const ip = (req.headers.get("x-forwarded-for") as string) || "";
    const userId = (session.user as { id: string }).id;
    const isLiked = await prisma.storyLike.findFirst({
      where: { storyId: +storyId, userId, ip },
    });
    if (isLiked) return NextResponse.json({ liked: true });
    return NextResponse.json({ liked: false });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
