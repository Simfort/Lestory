import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams;

    const storyId = search.get("id");

    if (!storyId) return NextResponse.json("Id is invalid", { status: 404 });

    const story = await prisma.story.findUnique({
      where: { id: Number(storyId) },
      include: {
        author: {
          select: {
            image: true,
            username: true,
          },
        },
      },
    });

    if (story) {
      return NextResponse.json(story, {
        status: 200,
      });
    }
    return NextResponse.json(null, {
      status: 404,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json("No session has auth", { status: 401 });
    }

    const urlPDF = data.get("urlPDF") as File;

    const markdown = data.get("markdown") as string;

    let content = "";
    let type: "md" | "pdf" | null = null;
    if (urlPDF instanceof File) {
      type = "pdf";

      const { url } = await put(`${uuidv4()}.pdf`, urlPDF, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      content = url;
    } else if (markdown) {
      type = "md";
      content = markdown;
    } else {
      return NextResponse.json("Content is null", { status: 500 });
    }

    const story = {
      title: data.get("title") as string,
      description: data.get("description") as string,
      category: data.get("category") as string,
      cover: data.get("urlCover") as string,
      keywords: data.get("keywords") as string,
      type,
      author_email: session?.user?.email as string,
      content,
      private: false,
    };
    const storyPr = await prisma.story.create({
      data: story,
    });
    return NextResponse.json(storyPr.id, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
