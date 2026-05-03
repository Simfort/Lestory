import { CreateData } from "./types";

export default async function createBook(
  data: CreateData,
  signal: AbortSignal,
) {
  try {
    const formData = new FormData();

    // Добавляем все текстовые поля в FormData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("cover", data.cover);
    formData.append("category", data.category);
    formData.append("keywords", data.keywords);

    formData.append("price", data.price);
    formData.append("chaptersLength", data.chapters.length.toString());
    // Обрабатываем главы и их изображения
    data.chapters.forEach((chapter, chapterIndex) => {
      // Добавляем заголовок главы
      formData.append(`chapters[${chapterIndex}][title]`, chapter.title);
      formData.append(
        `chapters[${chapterIndex}][imagesLength]`,
        chapter.images.length.toString(),
      );
      // Добавляем каждое изображение главы
      chapter.images.forEach((imageFile, imageIndex) => {
        formData.append(
          `chapters[${chapterIndex}][${imageIndex}][images]`,
          imageFile,
          `${chapter.title}_image_${imageIndex}`,
        );
      });
    });
    if (!signal) throw new Error("Signal is not defined");
    // Отправляем данные на сервер
    const response = await fetch("/api/story/chapters", {
      method: "POST",
      body: formData,
      signal,
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }
    if (signal.aborted) {
      console.log("Request was aborted");
      return;
    }
    const result = await response.json();
    console.log("Успешно отправлено:", result);
  } catch (error) {
    if (signal.aborted) {
      console.log("Operation cancelled");
    } else {
      console.error("Error:", error);
    }
  }
}
