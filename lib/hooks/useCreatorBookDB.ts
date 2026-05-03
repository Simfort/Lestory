import useIndexedDB from "./useIndexedDB";
import { CreateData } from "../types";

export default function useCreatorBookDB() {
  const { db, loading, error } = useIndexedDB();

  const add = (data: CreateData) => {
    if (!db || loading || error) {
      console.error("Database not ready:", {
        loading,
        error: error?.message,
      });
      return;
    }

    try {
      const transaction = db.transaction(["creator-book"], "readwrite");
      const objectStore = transaction.objectStore("creator-book");
      const request = objectStore.add(data);

      request.onsuccess = () => console.log("Book created");
      request.onerror = (e) =>
        console.error("Book not created:", request.error);
    } catch (err) {
      console.error("Transaction error in add:", err);
    }
  };

  const remove = (id: number) => {
    if (!db || loading || error) {
      console.error("Database not ready");
      return;
    }
    try {
      const transaction = db.transaction(["creator-book"], "readwrite");
      const objectStore = transaction.objectStore("creator-book");
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        console.log("Book deleted");
      };

      request.onerror = (e) => {
        console.error("Book not deleted:", request.error);
      };
    } catch (error) {
      console.error("Transaction error in remove:", error);
    }
  };

  const update = (data: CreateData & { id: number }) => {
    if (!db || loading || error) {
      console.error("Database not ready");
      return;
    }
    try {
      const transaction = db.transaction(["creator-book"], "readwrite");
      const objectStore = transaction.objectStore("creator-book");
      const request = objectStore.put(data);

      request.onsuccess = () => {
        console.log("Book updated");
      };

      request.onerror = (e) => {
        console.error("Book not updated:", request.error);
      };
    } catch (error) {
      console.error("Transaction error in update:", error);
    }
  };

  const get = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      console.log(db, loading, error);
      if (!db || loading || error) {
        reject("Database not ready");
        return;
      }

      try {
        const transaction = db.transaction(["creator-book"], "readonly");
        const objectStore = transaction.objectStore("creator-book");
        const request = objectStore.get(id);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (e) => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  return { remove, update, add, get, db, loading, error };
}
