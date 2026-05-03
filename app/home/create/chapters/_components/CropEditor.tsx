"use client";

import useCreateStore from "@/store/useCreateStore";
import { CheckLine, Download, X } from "lucide-react";
import Imageу from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CropEditor({
  url,
  setFlagCrop,
  setCurrentUrl,
}: {
  url: string;
  setFlagCrop: (arg: boolean) => void;
  setCurrentUrl: (arg: string) => void;
}) {
  const [cropStat, setCropStat] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 300,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<
    null | "nw" | "ne" | "sw" | "se"
  >(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, setData } = useCreateStore();
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
    };
    img.src = url;
  }, [url]);

  const cropImage = () => {
    if (!canvasRef.current || !imageRef.current || !containerRef.current)
      return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cropStat.width;
    canvas.height = cropStat.height;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Корректные коэффициенты масштабирования
    const scaleX = imageRef.current.naturalWidth / containerRect.width;
    const scaleY = imageRef.current.naturalHeight / containerRect.height;

    ctx.drawImage(
      imageRef.current,
      cropStat.x * scaleX,
      cropStat.y * scaleY,
      cropStat.width * scaleX,
      cropStat.height * scaleY,
      0,
      0,
      cropStat.width,
      cropStat.height,
    );

    const currentUrl = canvas.toDataURL("image/png");
    setCurrentUrl(currentUrl);
    setData({ ...data, cover: currentUrl });
    setFlagCrop(false);
  };

  const handleDragStart = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartPos.current = {
        x: e.clientX - rect.left - cropStat.x,
        y: e.clientY - rect.top - cropStat.y,
      };
    }
  };

  const handleResizeStart = (
    e: React.PointerEvent<HTMLDivElement>,
    direction: "nw" | "ne" | "sw" | "se",
  ) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      resizeStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    if (isDragging) {
      const newX = Math.max(
        0,
        Math.min(
          currentX - dragStartPos.current.x,
          containerWidth - cropStat.width,
        ),
      );
      const newY = Math.max(
        0,
        Math.min(
          currentY - dragStartPos.current.y,
          containerHeight - cropStat.height,
        ),
      );

      setCropStat((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
      return;
    }

    if (isResizing && resizeDirection) {
      let newX = cropStat.x;
      let newY = cropStat.y;
      let newWidth = cropStat.width;
      let newHeight = cropStat.height;

      switch (resizeDirection) {
        case "nw":
          // При движении влево: фиксируем правую границу, меняем левую
          newX = Math.max(currentX, 0);
          newY = Math.max(currentY, 0);
          console.log(newX);
          // Рассчитываем новые размеры
          newWidth = cropStat.x + cropStat.width - newX;
          newHeight = cropStat.y + cropStat.height - newY;

          // Минимальные размеры
          if (newWidth < 50) {
            newX = cropStat.x + cropStat.width - 50;
            newWidth = 50;
          }
          if (newHeight < 50) {
            newY = cropStat.y + cropStat.height - 50;
            newHeight = 50;
          }

          break;

        case "ne":
          // Правый верхний: фиксируем левый край, меняем ширину и высоту
          newWidth = currentX - cropStat.x;

          // Новая высота: расстояние от текущей позиции мыши до фиксированной нижней границы
          newHeight = cropStat.y + cropStat.height - currentY;
          newY = currentY;
          // Ограничения:
          // - минимальная ширина/высота — 50 px;
          // - максимальная ширина — до правого края контейнера;
          // - высота не может быть отрицательной
          newWidth = Math.max(
            50,
            Math.min(newWidth, containerWidth - cropStat.x),
          );
          newHeight = Math.max(50, newHeight);
          break;

        case "sw":
          // Левый нижний: фиксируем правый край, меняем высоту и левую границу
          newX = currentX;
          newHeight = currentY - cropStat.y;

          // Рассчитываем новую ширину
          newWidth = cropStat.x + cropStat.width - newX;

          // Минимальные размеры и ограничения
          if (newWidth < 50) {
            newX = cropStat.x + cropStat.width - 50;
            newWidth = 50;
          }
          newHeight = Math.max(
            50,
            Math.min(newHeight, containerHeight - cropStat.y),
          );
          break;

        case "se":
          // Правый нижний: меняем оба размера
          newWidth = currentX - cropStat.x;
          newHeight = currentY - cropStat.y;

          // Ограничения по размерам и границам
          newWidth = Math.max(
            50,
            Math.min(newWidth, containerWidth - cropStat.x),
          );
          newHeight = Math.max(
            50,
            Math.min(newHeight, containerHeight - cropStat.y),
          );
          break;
      }

      // Финальные ограничения по границам контейнера
      newX = Math.max(0, newX);
      newY = Math.max(0, newY);
      newX = Math.min(newX, containerWidth - newWidth);
      newY = Math.min(newY, containerHeight - newHeight);

      setCropStat({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  return createPortal(
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="w-full select-none inset-0 flex flex-col items-center justify-center h-screen fixed bg-black/20">
      <div
        ref={containerRef}
        className="relative w-80 h-100 backdrop-blur-2xl bg-black/40 p-2 rounded-xl">
        {/* Область обрезки */}
        <div
          className="absolute border-2  border-blue-500 bg-blue-500/20"
          style={{
            left: cropStat.x,
            top: cropStat.y,
            width: cropStat.width,
            height: cropStat.height,
          }}>
          <div className="h-full w-full grid grid-cols-2 grid-rows-2">
            <div className="border border-dotted border-blue-400"></div>
            <div className="border border-dotted border-blue-400"></div>
            <div className="border border-dotted border-blue-400"></div>
            <div className="border border-dotted border-blue-400"></div>
          </div>
          {/* Углы для изменения размера */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "nw")}
            className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full cursor-nwse-resize -top-2 -left-2 z-20"
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "ne")}
            className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full cursor-nesw-resize -top-2 -right-2 z-20"
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "sw")}
            className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full cursor-nesw-resize -bottom-2 -left-2 z-20"
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "se")}
            className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full cursor-nwse-resize -bottom-2 -right-2 z-20"
          />
        </div>

        {/* Маркер перетаскивания */}
        <span
          onPointerDown={handleDragStart}
          className="absolute h-3 w-3 bg-amber-400 rounded-full cursor-grab z-10"
          style={{
            left: cropStat.x + cropStat.width / 2 - 6,
            top: cropStat.y + cropStat.height / 2 - 6,
          }}
        />

        <Imageу
          src={url}
          alt="Cover Image"
          width={400}
          height={600}
          draggable="false"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Canvas для обработки обрезки (скрытый) */}
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        hidden
        className="w-full h-full object-contain rounded-lg"
      />

      {/* Панель управления */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={cropImage}
          className="p-2 bg-blue-500 shadow  text-white rounded-xl transition-colors hover:bg-blue-600">
          <CheckLine />
        </button>
      </div>

      {/* Отображение обрезанного изображения */}
    </div>,
    document.body,
  );
}
