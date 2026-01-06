"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProductSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const isSwiping = useRef(false);

  // CORRECCIÓN: Dependencia cambiada a 'images' para satisfacer al React Compiler
  const nextSlide = useCallback(() => {
    if (!images) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  // CORRECCIÓN: Dependencia cambiada a 'images'
  const prevSlide = useCallback(() => {
    if (!images) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !images || images.length <= 1) return;

    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isSwiping.current = false;
    };

    const handleTouchMove = (e) => {
      if (!startX.current) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = startX.current - currentX;
      const diffY = startY.current - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        isSwiping.current = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping.current || startX.current === 0) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX.current - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      startX.current = 0;
      startY.current = 0;
      isSwiping.current = false;
    };

    const options = { passive: false };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, options);
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
    // CORRECCIÓN: Dependencia 'images' en lugar de 'images.length'
  }, [images, nextSlide, prevSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'pan-y' }}
      className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-[9/16] border border-gray-200 select-none touch-pan-y"
    >
      <div className="relative w-full h-full pointer-events-none">
        <Image
          src={images[currentIndex]}
          alt={`${title} - Vista ${currentIndex + 1}`}
          fill
          className="object-contain transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentIndex === 0}
          unoptimized
          draggable={false}
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20 active:scale-95 touch-manipulation"
            aria-label="Anterior imagen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20 active:scale-95 touch-manipulation"
            aria-label="Siguiente imagen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors shadow-sm ${idx === currentIndex ? 'bg-gray-900 ring-1 ring-white' : 'bg-gray-400/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}