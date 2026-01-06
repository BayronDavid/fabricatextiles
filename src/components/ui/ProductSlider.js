"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProductSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const isSwiping = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images?.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images?.length]);

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
      
      const diffX = Math.abs(e.touches[0].clientX - startX.current);
      const diffY = Math.abs(e.touches[0].clientY - startY.current);
      
      // If horizontal movement is greater than vertical, it's a swipe
      if (diffX > diffY && diffX > 10) {
        isSwiping.current = true;
        e.preventDefault(); // Prevent vertical scroll only when swiping horizontally
      }
    };

    const handleTouchEnd = (e) => {
      if (!startX.current) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX.current;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }

      // Reset
      startX.current = 0;
      startY.current = 0;
      isSwiping.current = false;
    };

    // Use passive: false to allow preventDefault on touchmove
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [images?.length, nextSlide, prevSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-[9/16] border border-gray-200 select-none cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full">
        <Image 
          src={images[currentIndex]} 
          alt={`${title} - Vista ${currentIndex + 1}`}
          fill
          className="object-contain transition-transform duration-500 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentIndex === 0}
          unoptimized
          draggable={false}
        />
      </div>
      
      {/* Controls (only if > 1 image) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            aria-label="Anterior imagen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            aria-label="Siguiente imagen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-gray-900' : 'bg-gray-400/80 hover:bg-gray-500'}`}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint for mobile */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center md:hidden pointer-events-none">
            <span className="text-xs text-gray-500 bg-white/70 px-2 py-1 rounded-full">
              ← Desliza →
            </span>
          </div>
        </>
      )}
    </div>
  );
}
