import { prisma } from "@/config/prisma";
import { uploadFile } from "@/lib/uploadFile";
import { NextRequest, NextResponse } from "next/server";

const YANDEX_TOKEN = process.env.YANDEX_TOKEN;

if (!YANDEX_TOKEN) {
  throw new Error("Yandex is not define");
}

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.formData();
    const authorsString = (data.get("authors") as string).split(" ");

    const author = await prisma.user.findMany({
      where: {
        email: { in: authorsString },
      },
    });

    const story = {
      title: data.get("title") as string,
      category: data.get("category") as string,
      cover: data.get("cover") as string,
      keywords: data.get("keywords") as string,
      private: false,
      description: data.get("description") as string,
      type: "chapters",
      author,
    };

    const storyCreated = await prisma.story.create({
      data: {
        ...story,
        author: {
          connect: author.map((author) => ({
            id: author.id,
          })),
        },
      },
    });

    // Передаём request.signal в uploadFile
    await uploadFile(data, storyCreated.id, req.signal);

    return NextResponse.json("uraa", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка в POST /api/story/chapters:", error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
