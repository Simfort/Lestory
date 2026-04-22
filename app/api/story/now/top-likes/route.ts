import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newStories = await prisma.story.findMany({
      orderBy: {
        likes: {
          _count: "desc", // Сортировка по количеству просмотров (по убыванию)
        },
      },
      include: {
        likes: {
          select: {
            viewedAt: true, // Включаем только дату просмотра, а не все поля
          },

          orderBy: {
            viewedAt: "desc", // Берём самый свежий просмотр
          },
        },
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
