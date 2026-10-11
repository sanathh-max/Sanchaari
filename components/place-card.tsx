"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Place } from "@/lib/types";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <Link
      href={`/places/${place.slug}`}
      data-cursor="View"
      className="group isolate flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#E0D7C4] shadow-xs hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#E0A030]"
    >
      {/* Photo container with enforced aspect ratio and fallback */}
      <div className="relative aspect-16/10 w-full min-h-[210px] overflow-hidden bg-[#EAE1D0] shrink-0">
        {!hasImageError ? (
          <Image
            src={place.photo_url}
            alt={place.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
            onError={() => setHasImageError(true)}
          />
        ) : (
          /* Graceful fallback if external image fails */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EAE1D0] text-[#6C7976] p-4 text-center">
            <svg
              className="w-8 h-8 mb-1.5 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Photo unavailable</span>
          </div>
        )}

        {/* Category tag */}
        <span className="absolute top-3.5 left-3.5 bg-[#0E1B1A]/85 backdrop-blur-xs text-[#FAF7F0] text-xs font-medium px-3 py-1 rounded-full tracking-wide z-10 pointer-events-none">
          {place.category}
        </span>

        {/* Mood badge if present */}
        {place.mood && (
          <span className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-[#0E1B1A] text-[11px] font-medium px-2.5 py-1 rounded-full z-10 pointer-events-none">
            {place.mood}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div className="space-y-3">
          {/* Standardized header: city on top, heading, and dedicated saffron rating badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6C7976] block mb-1">
                {place.city}, India
              </span>
              <h2 className="font-serif text-xl font-bold text-[#0E1B1A] group-hover:text-[#B5502E] transition-colors leading-snug line-clamp-1">
                {place.name}
              </h2>
            </div>

            {/* Saffron rating badge with accessible ARIA label */}
            <div
              className="shrink-0 flex items-center gap-1 bg-[#FAF7F0] border border-[#E0D7C4] px-2.5 py-1 rounded-lg"
              aria-label={`Rated ${place.rating.toFixed(1)} out of 5 stars`}
            >
              <span className="text-[#E0A030] text-sm" aria-hidden="true">
                ★
              </span>
              <span className="text-xs font-bold text-[#0E1B1A]">
                {place.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Curiosity hook: Italic Fraunces teaser */}
          <p className="font-serif italic text-sm text-[#0E1B1A]/85 leading-relaxed line-clamp-2">
            &ldquo;{place.teaser || place.description}&rdquo;
          </p>

          {/* Short description */}
          <p className="text-xs text-[#6C7976] line-clamp-2 leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Footer info: tags & reviews */}
        <div className="mt-5 pt-3.5 border-t border-[#F2ECE0] flex items-center justify-between text-xs text-[#6C7976]">
          <div className="flex flex-wrap gap-1.5">
            {place.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-[#F4EEE1] px-2.5 py-0.5 rounded text-[#6C7976]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span>
            {place.review_count} {place.review_count === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>
    </Link>
  );
}
