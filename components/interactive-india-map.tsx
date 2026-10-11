"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Place } from "@/lib/types";

interface InteractiveIndiaMapProps {
  places: Place[];
}

// Normalized coordinate placements on a stylized Indian subcontinent canvas
const PIN_COORDINATES: Record<string, { top: number; left: number }> = {
  "mehrauli-forest-steps-delhi": { top: 27, left: 33 },
  "nongriat-stilt-cottage-meghalaya": { top: 38, left: 81 },
  "yazdani-bakery-mumbai": { top: 58, left: 20 },
  "fontainhas-latin-quarter-goa": { top: 70, left: 22 },
  "boulders-hideaway-hampi": { top: 71, left: 32 },
  "taneerhulla-coffee-homestay-coorg": { top: 81, left: 28 },
  "airlines-hotel-bengaluru": { top: 79, left: 35 },
  "kashi-art-cafe-kochi": { top: 89, left: 30 },
  "kuttanad-canal-canoe-trail-alleppey": { top: 92, left: 32 },
};

export default function InteractiveIndiaMap({ places }: InteractiveIndiaMapProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activePlace = places.find((p) => p.slug === activeSlug);

  return (
    <section className="py-20 sm:py-28 bg-[#F4EEE1] border-b border-[#E0D7C4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Introduction */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block">
              Cartography
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E1B1A] font-bold tracking-tight leading-tight">
              An offbeat atlas of the subcontinent
            </h2>
            <p className="text-base text-[#6C7976] leading-relaxed">
              Hover over any glowing beacon on the map to preview the place, or
              click to read the visitor notes. From ancient acacia groves in
              Delhi down to sea-level paddy waterways in Kuttanad.
            </p>

            {/* Quick list of highlighted regions */}
            <div className="pt-4 grid grid-cols-2 gap-2 text-xs text-[#0E1B1A]">
              {places.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  onMouseEnter={() => setActiveSlug(place.slug)}
                  onFocus={() => setActiveSlug(place.slug)}
                  className={`text-left py-1.5 px-2.5 rounded-lg border transition-colors cursor-pointer truncate ${
                    activeSlug === place.slug
                      ? "bg-[#0E1B1A] text-[#FAF7F0] border-[#0E1B1A]"
                      : "bg-white/80 hover:bg-white text-[#0E1B1A] border-[#E0D7C4]"
                  }`}
                >
                  <span className="text-[#E0A030] mr-1.5">●</span>
                  {place.name} ({place.city})
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Stylized India Map Canvas with Glowing Pins */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-4/5 bg-[#EAE1D0]/60 rounded-3xl p-6 border border-[#E0D7C4] shadow-inner overflow-visible">
              {/* Stylized background watermark of India */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none select-none">
                <svg
                  viewBox="0 0 500 600"
                  className="w-full h-full stroke-[#0E1B1A] fill-[#0E1B1A]/30"
                  aria-hidden="true"
                >
                  {/* Subtle decorative geographical contour curves */}
                  <path
                    d="M 230 40 Q 250 120 200 180 Q 140 240 130 330 Q 120 420 180 520 Q 200 550 205 570 Q 220 540 240 470 Q 280 390 330 300 Q 370 240 430 220 Q 450 200 390 190 Q 320 200 280 140 Z"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="205" cy="565" r="12" fill="none" strokeWidth="1" />
                </svg>
              </div>

              {/* Pins layer */}
              <div className="relative w-full h-full">
                {places.map((place) => {
                  const coords = PIN_COORDINATES[place.slug] || {
                    top: 50,
                    left: 50,
                  };
                  const isActive = activeSlug === place.slug;

                  return (
                    <div
                      key={place.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        top: `${coords.top}%`,
                        left: `${coords.left}%`,
                      }}
                    >
                      {/* Interactive Pin Button */}
                      <button
                        type="button"
                        aria-label={`View ${place.name} in ${place.city}`}
                        onMouseEnter={() => setActiveSlug(place.slug)}
                        onFocus={() => setActiveSlug(place.slug)}
                        onClick={() => setActiveSlug(place.slug)}
                        className="relative group p-2 cursor-pointer focus:outline-none"
                      >
                        {/* Glowing pulse aura */}
                        <span className="absolute inset-1 rounded-full bg-[#E0A030] animate-ping opacity-60" />
                        <span
                          className={`relative block w-4 h-4 rounded-full border-2 transition-transform duration-200 ${
                            isActive
                              ? "bg-[#B5502E] border-white scale-140 shadow-lg"
                              : "bg-[#E0A030] border-[#0E1B1A] group-hover:scale-125"
                          }`}
                        />
                      </button>

                      {/* City Name Label beside pin */}
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider text-[#0E1B1A] font-semibold bg-white/70 px-1.5 py-0.5 rounded backdrop-blur-xs pointer-events-none whitespace-nowrap shadow-2xs">
                        {place.city}
                      </span>
                    </div>
                  );
                })}

                {/* Floating Preview Card on hover */}
                {activePlace && (
                  <div className="absolute bottom-4 left-4 right-4 z-30 bg-[#0E1B1A] text-[#FAF7F0] p-4 rounded-2xl border border-[#233D3A] shadow-2xl animate-fade-in">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden shrink-0 bg-[#152725]">
                        <Image
                          src={activePlace.photo_url}
                          alt={activePlace.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#E0A030] block">
                          {activePlace.city} · {activePlace.category}
                        </span>
                        <h3 className="font-serif text-base font-bold text-white truncate">
                          {activePlace.name}
                        </h3>
                        <p className="font-serif italic text-xs text-[#FAF7F0]/80 line-clamp-1 mt-0.5">
                          &ldquo;{activePlace.teaser}&rdquo;
                        </p>
                      </div>
                      <Link
                        href={`/places/${activePlace.slug}`}
                        data-cursor="View"
                        className="shrink-0 bg-[#E0A030] hover:bg-[#F7BA4A] text-[#0E1B1A] text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
