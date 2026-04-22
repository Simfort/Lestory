import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newStories = await prisma.storyView.findMany({
      orderBy: {
        viewedAt: "desc",
      },
      select: {
        story: true,
      },
      take: 5,
    });
    return NextResponse.json(newStories, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
