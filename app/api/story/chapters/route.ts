import { prisma } from "@/config/prisma";
import { uploadFile } from "@/lib/uploadFile";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const YANDEX_TOKEN = process.env.YANDEX_TOKEN;

if (!YANDEX_TOKEN) {
  throw new Error("Yandex is not define");
}

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.formData();
    const session = await getServerSession();
    console.log(session);
    if (!session?.user?.email)
      return NextResponse.json("Not auth", { status: 401 });

    const story = {
      title: data.get("title") as string,
      category: data.get("category") as string,
      cover: data.get("cover") as string,
      keywords: data.get("keywords") as string,
      private: false,
      description: data.get("description") as string,
      type: "chapters",
      author_email: session.user.email,
    };

    const storyCreated = await prisma.story.create({
      data: {
        ...story,
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
