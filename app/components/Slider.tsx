"use client";

import { useState, useEffect } from 'react';
import ZoomableImage from './ZoomableImage';

export default function Slider({ slides }: { slides: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds auto-play
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mt-12 bg-slate-100" style={{ minHeight: '300px' }}>
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative aspect-[16/9] md:aspect-[21/9]">
            <img 
              src={slide.foto_url} 
              alt={slide.judul || 'Slider Image'} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
              {slide.judul && <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">{slide.judul}</h3>}
              {slide.deskripsi && <p className="text-sm md:text-lg text-slate-200 max-w-3xl">{slide.deskripsi}</p>}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? 'bg-emerald-500 w-6' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
