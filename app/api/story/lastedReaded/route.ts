import { nextAuthConfig } from "@/config/nextauth";
import { prisma } from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(nextAuthConfig);
    if (!session) return NextResponse.json("Is not auth", { status: 401 });
    const lastReaded = await prisma.storyView.findMany({
      where: { userId: (session.user as { id: string }).id },
      take: 10,
      include: {
        story: true,
      },
    });
    return NextResponse.json(lastReaded, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
