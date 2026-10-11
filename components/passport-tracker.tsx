"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

interface PassportTrackerProps {
  totalPlaces?: number;
}

const STORAGE_KEY = "sanchaari_passport";

export function markPlaceAsFound(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    if (!existing.includes(slug)) {
      const updated = [...existing, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("sanchaari_passport_updated"));
    }
  } catch (e) {
    console.error("Passport storage error:", e);
  }
}

function subscribePassport(callback: () => void) {
  window.addEventListener("sanchaari_passport_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("sanchaari_passport_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getPassportSnapshot() {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getPassportServerSnapshot() {
  return "[]";
}

export default function PassportTracker({ totalPlaces = 9 }: PassportTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const rawStorage = useSyncExternalStore(
    subscribePassport,
    getPassportSnapshot,
    getPassportServerSnapshot
  );

  let visitedSlugs: string[] = [];
  try {
    visitedSlugs = JSON.parse(rawStorage);
  } catch {
    visitedSlugs = [];
  }

  const foundCount = visitedSlugs.length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Passport: ${foundCount} of ${totalPlaces} places found`}
        className="flex items-center gap-2 bg-[#152725] hover:bg-[#1E3634] text-[#FAF7F0] border border-[#233D3A] px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E0A030]"
      >
        <span
          className="w-2 h-2 rounded-full bg-[#E0A030] animate-pulse"
          aria-hidden="true"
        />
        <span className="font-serif tracking-wide">Passport</span>
        <span className="text-[#A2B1AE] font-mono">
          {foundCount} of {totalPlaces} found
        </span>
      </button>

      {/* Gentle popup modal showing visited status */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0E1B1A] border border-[#233D3A] rounded-xl p-4 shadow-xl z-50 text-xs text-[#FAF7F0] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#233D3A]">
            <span className="font-serif text-sm font-semibold text-[#E0A030]">
              Your Wanderer&apos;s Passport
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#6C7976] hover:text-[#FAF7F0] text-sm cursor-pointer"
              aria-label="Close passport"
            >
              ✕
            </button>
          </div>
          <p className="text-[#A2B1AE] leading-relaxed">
            Every time you read about a place, your browser stamps it here. Open
            new stories to find all {totalPlaces} destinations.
          </p>
          <div className="w-full bg-[#152725] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#E0A030] h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (foundCount / totalPlaces) * 100)}%` }}
            />
          </div>
          {visitedSlugs.length > 0 ? (
            <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto no-scrollbar">
              {visitedSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/places/${slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-[#FAF7F0] hover:text-[#E0A030] truncate capitalize"
                >
                  ✓ {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#6C7976] italic">
              No stamps yet. Click any place card below to begin.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
