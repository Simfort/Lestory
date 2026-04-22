"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PreviewChapterItem({ image }: { image: File }) {
  const [loaded, setLoaded] = useState(false);
  const [url, setUrl] = useState("");
  const containerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          const reader = new FileReader();
          reader.onload = () => {
            setUrl(reader.result as string);
            setLoaded(true);
          };
          reader.readAsDataURL(image);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [image]);
  return (
    <div ref={containerRef} className="h-150 w-100 bg-black">
      {loaded ? (
        <Image
          height={600}
          src={url}
          width={400}
          className="w-full h-full"
          alt="Image"
        />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
