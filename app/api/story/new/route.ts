import { prisma } from "@/config/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const news = await prisma.story.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
