const YANDEX_TOKEN = process.env.YANDEX_TOKEN;

if (!YANDEX_TOKEN) {
  throw new Error("Yandex is not define");
}

export async function getPublicFileUrl(filePath: string): Promise<string> {
  console.log(filePath);
  if (!filePath) return "unknown";
  const response = await fetch(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(filePath)}`,
    {
      headers: {
        Authorization: `OAuth ${YANDEX_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Ошибка получения информации о файле: ${response.statusText}`,
    );
  }

  const data = await response.json();

  // Если публичная ссылка уже существует
  if (data.public_url) {
    return data.public_url;
  }

  // Создаём новую публичную ссылку
  const publishResponse = await fetch(
    `https://cloud-api.yandex.net/v1/disk/resources/publish?path=${encodeURIComponent(filePath)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `OAuth ${YANDEX_TOKEN}`,
      },
    },
  );

  if (!publishResponse.ok) {
    throw new Error(`Ошибка публикации файла: ${publishResponse.statusText}`);
  }

  // Получаем обновлённую информацию с публичной ссылкой
  const updatedResponse = await fetch(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(filePath)}`,
    {
      headers: {
        Authorization: `OAuth ${YANDEX_TOKEN}`,
      },
    },
  );

  const updatedData = await updatedResponse.json();
  return updatedData.public_url;
}
