"use client";
import { useEffect, useState } from "react";

export default function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const request = indexedDB.open("BookDB", 2);

    request.onsuccess = (event) => {
      const database = request.result;
      setDb(database);
      setLoading(false);
      console.log("База данных успешно открыта");
    };

    request.onupgradeneeded = (event) => {
      const database = request.result;

      // Проверяем, существует ли хранилище
      if (!database.objectStoreNames.contains("creator-book")) {
        const store = database.createObjectStore("creator-book", {
          keyPath: "id",
          autoIncrement: true,
        });

        // Создаём индексы
        store.createIndex("title", "title", { unique: false });
        store.createIndex("description", "description", { unique: false });
        store.createIndex("cover", "cover", { unique: false });
        store.createIndex("category", "category", { unique: false });
        store.createIndex("keywords", "keywords", { unique: false });
        store.createIndex("chapters", "chapters", { unique: false });

        console.log("Хранилище creator-book и индексы созданы");
      } else {
        console.log("Хранилище creator-book уже существует");
      }
    };

    request.onerror = (event) => {
      setError(request.error || new Error("Failed to open database"));
      setLoading(false);
    };

    request.onblocked = () => {
      console.warn("Database open blocked — close other tabs with this app");
    };
  }, []);

  return { db, loading, error };
}
