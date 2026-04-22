import YandexDisk from "yandisk";

const YANDEX_TOKEN = process.env.YANDEX_TOKEN;

if (!YANDEX_TOKEN) {
  throw new Error("Yandex is not define");
}

const yadisk = new YandexDisk(YANDEX_TOKEN!);
export { yadisk };
