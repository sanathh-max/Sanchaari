"use client";

import { useEffect, useState } from "react";
import { markPlaceAsFound } from "./passport-tracker";
import { Place } from "@/lib/types";

interface PlacePageInteractionsProps {
  place: Place;
}

export default function PlacePageInteractions({
  place,
}: PlacePageInteractionsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    // Stamp the user's passport for discovering this place!
    markPlaceAsFound(place.slug);

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
        // Show sticky bar after scrolling past 400px (hero section)
        setShowStickyBar(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [place.slug]);

  const scrollToReviews = () => {
    const el = document.getElementById("reviews-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Thin Golden Reading Progress Line */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#E0A030] transition-all duration-100 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Bottom Action Bar (Mobile & Desktop) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0E1B1A]/95 text-[#FAF7F0] border-t border-[#233D3A] px-6 py-3.5 backdrop-blur-md transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-serif text-sm font-semibold truncate block">
              {place.name}
            </span>
            <span className="text-xs text-[#8E9D9A]">
              ★ {place.rating.toFixed(1)} · {place.city}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={scrollToReviews}
              className="px-3.5 py-2 text-xs font-medium rounded-xl border border-[#233D3A] bg-[#152725] hover:bg-[#1E3634] text-[#FAF7F0] transition-colors cursor-pointer"
            >
              Reviews ({place.review_count})
            </button>

            {place.affiliate_url && (
              <a
                href={place.affiliate_url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#E0A030] hover:bg-[#F7BA4A] text-[#0E1B1A] transition-colors"
              >
                {place.category === "Stay"
                  ? "Book stay"
                  : place.category === "Eat"
                  ? "Reserve table"
                  : "Plan visit"}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
