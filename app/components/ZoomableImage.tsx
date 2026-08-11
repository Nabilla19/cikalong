"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function ZoomableImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={() => setIsOpen(false)}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <button 
          className="absolute top-4 right-4 md:-right-12 md:-top-12 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-[10000]"
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
        >
          <X className="w-8 h-8" />
        </button>
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl !transform-none !filter-none animate-in zoom-in-90 duration-300" 
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className={`${className} cursor-pointer hover:opacity-90 transition-opacity`} 
        onClick={() => setIsOpen(true)} 
      />
      
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
