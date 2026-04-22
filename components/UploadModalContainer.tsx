"use client";

import useLoadingBackground from "@/store/useLoadingBackground";
import { AnimatePresence } from "framer-motion";
import UploadModal from "./UploadModal";

export default function UploadModalContainer() {
  const { data, setData } = useLoadingBackground();
  return (
    <div className="w-full top-0   items-center justify-center flex absolute">
      <AnimatePresence>
        {data.view && <UploadModal data={data} setData={setData} />}
      </AnimatePresence>
    </div>
  );
}
