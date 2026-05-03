import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const pageStr = req.nextUrl.searchParams.get("page");
    const limit = 10;

    // Валидация обязательных параметров
    if (!category || !pageStr) {
      return NextResponse.json(
        { error: "Category or page are not defined" },
        { status: 400 },
      );
    }

    // Безопасное преобразование page в число
    const page = parseInt(pageStr, 10);
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 },
      );
    }

    const skip = (page - 1) * limit;

    // Основной запрос с пагинацией и сортировкой
    const otherStories = await prisma.story.findMany({
      where: { category },
      take: limit,
      skip,
      include: {
        views: true, // Подгружаем связанные просмотры
      },
      orderBy: {
        views: { _count: "desc" }, // Сортировка по количеству просмотров (убывание)
      },
    });

    // Общее количество записей для текущей категории
    const totalCount = await prisma.story.count({ where: { category } });
    const hasMore = skip + otherStories.length < totalCount;

    // Возвращаем структурированный ответ
    return NextResponse.json(
      {
        data: otherStories,
        pagination: {
          page,
          limit,
          total: totalCount,
          hasMore,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/story/others:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
