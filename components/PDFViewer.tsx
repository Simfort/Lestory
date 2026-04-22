"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { ArrowLeft, ArrowRight, Fullscreen, X } from "lucide-react";

// Настройка worker'а для Next.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
  file: string | File | ArrayBuffer;
  pageNumber?: number;
  scale?: number;
}

export default function PDFViewer({
  file,
  pageNumber = 1,
  scale = 1.0,
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false); // Флаг рендеринга
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case "ArrowLeft":
        case "PageUp":
          goToPrevPage();
          break;
        case "ArrowRight":
        case "PageDown":
        case " ": // пробел
          goToNextPage();
          break;
        case "Escape":
          fullscreenExitPDF();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen, currentPage, numPages]);
  useEffect(() => {
    if (!containerRef.current || !isFullscreen) return;

    let startX: number;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      // Порог для срабатывания свайпа
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Свайп влево — следующая страница
          goToNextPage();
        } else {
          // Свайп вправо — предыдущая страница
          goToPrevPage();
        }
        startX = 0; // Сброс после обработки
      }
    };

    const container = containerRef.current;
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isFullscreen]);
  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [pdfDoc]);

  // Загрузка PDF документа
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        let loadingTask;

        if (typeof file === "string") {
          loadingTask = pdfjsLib.getDocument({ url: file });
        } else if (file instanceof File) {
          const arrayBuffer = await file.arrayBuffer();
          loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        } else {
          loadingTask = pdfjsLib.getDocument({ data: file });
        }

        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки PDF:", err);
        setError("Не удалось загрузить PDF файл");
        setLoading(false);
      }
    };

    loadPDF();
  }, [file]);

  // Рендеринг страницы с защитой от гонок
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || isRendering) return;

    const renderPage = async () => {
      setIsRendering(true); // Блокируем UI

      try {
        // Отмена предыдущего рендеринга перед новым
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context!,
          viewport: viewport,
        };

        renderTaskRef.current = page.render(renderContext);

        await renderTaskRef.current.promise;
        renderTaskRef.current = null; // Очищаем после успешного завершения
      } catch (err) {
        if (err.name !== "RenderingCancelledException") {
          console.error("Ошибка рендеринга страницы:", err);
          setError("Не удалось отобразить страницу");
        }
      } finally {
        setIsRendering(false); // Разблокируем UI
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale, isRendering]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const fullscreenPDF = () => {
    if (canvasRef.current) {
      setFullscreen(true);
      containerRef.current!.requestFullscreen();
    }
  };
  const fullscreenExitPDF = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-80 bg-gray-50 rounded-lg">
        <div className="text-gray-500">Загрузка PDF...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 w-80 bg-red-50 rounded-lg">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-center items-center ${
        isFullscreen ? "fixed inset-0 bg-black z-50" : ""
      }`}>
      {/* Полноэкранная панель управления */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 bg-black/80 text-white p-4 flex justify-between items-center z-50">
          <button
            onClick={fullscreenExitPDF}
            className="p-2 hover:bg-white/10 rounded-full"
            aria-label="Выход из полноэкранного режима">
            <X className="w-6 h-6" />
          </button>
          <span className="text-lg font-medium">
            Страница {currentPage} из {numPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="p-2 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
              aria-label="Предыдущая страница">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="p-2 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
              aria-label="Следующая страница">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Панель управления в обычном режиме */}
      {!isFullscreen && numPages > 1 && (
        <div className="flex items-center gap-4 p-2 bg-gray-100 rounded-xl mb-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1 bg-blue-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            aria-label="Предыдущая страница">
            <ArrowLeft />
          </button>
          <span className="text-gray-700">
            Страница {currentPage} из {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="px-3 py-1 bg-blue-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            aria-label="Следующая страница">
            <ArrowRight />
          </button>
        </div>
      )}

      {/* Кнопка полноэкранного режима в обычном режиме */}
      {!isFullscreen && (
        <button
          onClick={fullscreenPDF}
          className="shadow rounded-xl hover:opacity-70 active:opacity-50 p-2 mt-2 bg-blue-50 text-blue-500 mb-2"
          aria-label="Полноэкранный режим">
          <Fullscreen />
        </button>
      )}

      {/* Canvas для отображения PDF */}
      <canvas
        ref={canvasRef}
        className={`border border-gray-200 shadow-lg rounded-lg ${
          isFullscreen ? "w-screen h-screen" : ""
        }`}
        style={{
          maxWidth: "100%",
          height: "auto",
          ...(isFullscreen && {
            width: "100vw",
            height: "calc(100vh - 80px)", // Отнимаем место для панели управления
            objectFit: "contain",
          }),
        }}
      />

      {/* Полноэкранная кнопка выхода */}
      {isFullscreen && (
        <button
          onClick={fullscreenExitPDF}
          className="fixed bottom-4 right-4 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 z-50"
          aria-label="Выход из полноэкранного режима">
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
