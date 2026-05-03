"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PreviewItem({ image }: { image: string }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Сброс состояний при смене изображения
    setLoaded(false);
    setHasError(false);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setLoaded(true);
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

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className="h-150 w-100 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Изображение не загрузилось</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-150 w-100 max-sm:w-80 max-sm:h-100 relative bg-black">
      {loaded ? (
        <Image
          src={image}
          alt="Image"
          width={400}
          height={600}
          className="w-full h-full object-cover"
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          Loading
        </div>
      )}
    </div>
  );
}
