"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PhotoGalleryProps {
  photos: string[];
  placeName: string;
  credit?: string;
}

export default function PhotoGallery({
  photos,
  placeName,
  credit,
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  // Close lightbox with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! + 1) % photos.length);
      }
      if (e.key === "ArrowLeft" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (lightboxIndex === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) {
      // Swiped right -> previous
      setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    } else if (diff < -50) {
      // Swiped left -> next
      setLightboxIndex((prev) => (prev! + 1) % photos.length);
    }
  };

  if (!photos || photos.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-[#0E1B1A] font-bold">
          Visual glimpses
        </h3>
        <span className="text-xs text-[#6C7976]">
          {photos.length} photographs · Click to enlarge
        </span>
      </div>

      {/* Grid of gallery thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {photos.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open photo ${i + 1} of ${placeName} in fullscreen`}
            className="group relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#EAE1D0] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E0A030]"
          >
            <Image
              src={src}
              alt={`${placeName} photo ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {credit && (
        <p className="text-[11px] text-[#808C89] italic">
          Photography credit: {credit}
        </p>
      )}

      {/* Full-screen Lightbox Modal with Mobile Touch Swipe */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen photo view for ${placeName}`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar with count & close */}
          <div className="w-full flex items-center justify-between text-white text-xs z-10">
            <span className="font-mono">
              {lightboxIndex + 1} / {photos.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer text-base"
              aria-label="Close photo modal"
            >
              ✕
            </button>
          </div>

          {/* Centered Large Image */}
          <div className="relative w-full max-w-5xl h-[70vh] sm:h-[78vh] flex items-center justify-center">
            <Image
              src={photos[lightboxIndex]}
              alt={`${placeName} photo ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Bar: Prev / Next buttons and caption */}
          <div className="w-full max-w-xl flex items-center justify-between text-white text-xs z-10 pt-2">
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev! - 1 + photos.length) % photos.length
                )
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              ← Previous
            </button>

            <span className="hidden sm:inline text-stone-400">
              Use arrow keys or swipe to browse
            </span>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! + 1) % photos.length)
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
