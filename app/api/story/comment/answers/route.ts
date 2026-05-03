import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const commentId = req.nextUrl.searchParams.get("commentId");
    if (!commentId)
      return NextResponse.json("Comment id undefined", { status: 500 });
    const comments = await prisma.comment.findMany({
      where: {
        comment_id: +commentId,
      },
      include: {
        author: true,
        answers: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments || [], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
