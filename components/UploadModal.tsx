"use client";

import { UseLoadingBackground } from "@/lib/types";
import { Book, Loader, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function UploadModal({ setData, data }: UseLoadingBackground) {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const handleRemove = () => {
    controllerRef.current?.abort();
    setData({ view: false, title: "", cb: null });
  };
  useEffect(() => {
    controllerRef.current = new AbortController();
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, []);
  useEffect(() => {
    const controller = controllerRef.current;
    const init = async () => {
      if (controller) {
        if (data.cb) {
          console.log(2);
          setLoading(true);
          await data.cb(controller.signal);
          setLoading(false);
          setData({ view: false, title: "", cb: null });
        }
      }
    };
    init();
    return () => {
      controllerRef.current?.abort();
    };
  }, [data.cb]);
  return (
    <div className="fixed inset-0 z-1024  flex items-start justify-center h-20 pt-12 px-4">
      <div className="flex bg-background rounded-xl border-2 shadow border-blue-200 p-5 gap-10 items-center">
        <Book size={40} />
        <div className="flex-col flex gap-2">
          {" "}
          {loading && <Loader className="animate-spin" />}{" "}
          <p className="text-foreground/50 text-sm">{data.title}</p>
        </div>

        <button className="text-red-500" onClick={handleRemove}>
          <X />
        </button>
      </div>
    </div>
  );
}
