"use client";

import Image from "next/image";
import Link from "next/link";
import { Place } from "@/lib/types";

interface FoundThisWeekRailProps {
  places: Place[];
}

export default function FoundThisWeekRail({ places }: FoundThisWeekRailProps) {
  // Select 5 highlight places for the weekly rail
  const weeklyPicks = places.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E0D7C4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block mb-2">
            Weekly discoveries
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0E1B1A] font-bold tracking-tight">
            Found this week
          </h2>
        </div>
        <p className="text-sm text-[#6C7976] max-w-md">
          A few quiet corners our contributors recently returned from. Swipe or
          scroll horizontally to explore.
        </p>
      </div>

      {/* Horizontal Rail */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {weeklyPicks.map((place, index) => {
            // Alternate subtle rotation angles for an organic, editorial look
            const tiltClass =
              index % 2 === 0
                ? "-rotate-1 hover:rotate-0"
                : "rotate-1 hover:rotate-0";

            return (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                data-cursor="View"
                className={`group relative snap-start shrink-0 w-[280px] sm:w-[340px] aspect-3/4 rounded-2xl overflow-hidden bg-[#152725] text-white shadow-md hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 ${tiltClass}`}
              >
                {/* Background Photo */}
                <Image
                  src={place.photo_url}
                  alt={place.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B1A] via-[#0E1B1A]/40 to-black/30" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  {/* Top: City and Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-medium text-[#FAF7F0] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      {place.city}
                    </span>
                    <span className="text-[11px] font-mono text-[#E0A030] bg-[#152725]/80 px-2 py-0.5 rounded-md">
                      ★ {place.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Bottom: Name & Italic Fraunces Teaser */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-bold leading-tight group-hover:text-[#E0A030] transition-colors">
                      {place.name}
                    </h3>
                    <p className="font-serif italic text-sm text-[#FAF7F0]/90 leading-snug line-clamp-3">
                      &ldquo;{place.teaser}&rdquo;
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs text-[#CBD5D3]">
                      <span>{place.category}</span>
                      <span>·</span>
                      <span>{place.review_count} reviews</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
