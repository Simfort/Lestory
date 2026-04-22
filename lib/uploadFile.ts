import { v4 as uuidv4 } from "uuid";
import { Chapter } from "@/prisma/generated/prisma/client";

import { prisma } from "@/config/prisma";
import { yadisk } from "@/config/yadisk";

export async function uploadFile(
  data: FormData,
  id: number,
  signal: AbortSignal, // Добавляем сигнал прерывания
) {
  const chaptersLength = +data.get("chaptersLength")!;

  for (let i = 0; i < chaptersLength; i++) {
    // Проверяем прерывание перед обработкой каждой главы
    if (signal.aborted) {
      throw new DOMException("Upload cancelled by user", "AbortError");
    }

    const chapter: Omit<Chapter, "id" | "createdAt"> = {
      storyId: id,
      title: data.get(`chapters[${i}][title]`) as string,
      images: [],
      description: "",
    };

    const imagesLen = +data.get(`chapters[${i}][imagesLength]`)!;

    for (let j = 0; j < imagesLen; j++) {
      // Проверяем прерывание перед загрузкой каждого файла
      if (signal.aborted) {
        throw new DOMException("Upload cancelled by user", "AbortError");
      }

      const file = data.get(`chapters[${i}][${j}][images]`);

      if (!file || !(file instanceof File)) {
        console.warn(
          `Файл для главы ${i}, изображения ${j} не найден или не является файлом`,
        );
        continue;
      }

      const filename = uuidv4();
      await yadisk.uploadFile(filename, file, "/", signal);
      console.log("Upload " + filename);
      const fileUrl = await yadisk.getPublicUrl(filename, signal);
      console.log("Public get " + filename);
      chapter.images.push(fileUrl);
    }

    await prisma.chapter.create({ data: { ...chapter } });
  }
}
