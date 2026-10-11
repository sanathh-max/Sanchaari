"use client";

import { useState, useMemo } from "react";
import { Place, Category, Mood } from "@/lib/types";
import PlaceCard from "./place-card";

interface PlaceExplorerProps {
  initialPlaces: Place[];
  activeMood?: Mood | null;
  onClearMood?: () => void;
}

const CATEGORIES: ("All" | Category)[] = ["All", "Stay", "Eat", "See"];

export default function PlaceExplorer({
  initialPlaces,
  activeMood,
  onClearMood,
}: PlaceExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");

  // Filter places based on search query, category, and mood
  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return initialPlaces.filter((place) => {
      // Category check
      const matchesCategory =
        selectedCategory === "All" || place.category === selectedCategory;
      if (!matchesCategory) return false;

      // Mood filter check
      if (activeMood && place.mood !== activeMood) {
        return false;
      }

      // Search query check (name, city, tags, teaser, description)
      if (!q) return true;

      const matchesName = place.name.toLowerCase().includes(q);
      const matchesCity = place.city.toLowerCase().includes(q);
      const matchesDescription = place.description.toLowerCase().includes(q);
      const matchesTeaser = place.teaser?.toLowerCase().includes(q);
      const matchesTags = place.tags.some((tag) =>
        tag.toLowerCase().includes(q)
      );

      return (
        matchesName ||
        matchesCity ||
        matchesDescription ||
        matchesTeaser ||
        matchesTags
      );
    });
  }, [initialPlaces, searchQuery, selectedCategory, activeMood]);

  return (
    <section id="explore" className="scroll-mt-12 space-y-8">
      {/* Header for directory */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block mb-2">
            The complete index
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0E1B1A] font-bold tracking-tight">
            Curated places
          </h2>
        </div>
        <p className="text-sm text-[#6C7976] max-w-md">
          Search by town or keyword, or filter by stays, meals and sights.
        </p>
      </div>

      {/* Active Mood Pill Banner if chosen in hero */}
      {activeMood && (
        <div className="flex items-center gap-3 bg-[#0E1B1A] text-[#FAF7F0] px-4 py-2.5 rounded-xl border border-[#233D3A] text-sm">
          <span>Filtering by mood:</span>
          <span className="bg-[#E0A030] text-[#0E1B1A] font-semibold px-2.5 py-0.5 rounded-md text-xs">
            {activeMood}
          </span>
          <button
            type="button"
            onClick={onClearMood}
            className="text-xs text-[#CBD5D3] hover:text-[#FAF7F0] underline ml-auto cursor-pointer"
          >
            Clear mood filter
          </button>
        </div>
      )}

      {/* Search and Category Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E0D7C4] shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            Search by place name, city, or keywords
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C7976]">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city, or flavor (e.g. Kochi, Hampi, coffee, rainforest)..."
            className="w-full pl-11 pr-4 py-3 bg-[#F4EEE1]/60 border border-[#E0D7C4] rounded-xl text-[#0E1B1A] placeholder-[#808C89] text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E0A030]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#6C7976] hover:text-[#0E1B1A] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1" role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0E1B1A] text-[#FAF7F0] shadow-xs"
                    : "bg-[#F4EEE1] text-[#0E1B1A] hover:bg-[#EAE1D0] border border-[#E0D7C4]"
                }`}
                aria-pressed={isSelected}
              >
                {cat === "All" ? "All categories" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header directly above the results grid */}
      <div
        className="flex items-center justify-between px-1"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm font-medium text-[#0E1B1A]">
          {filteredPlaces.length === 1
            ? "1 place found"
            : `${filteredPlaces.length} places found`}
          {selectedCategory !== "All" && (
            <span className="text-[#6C7976] font-normal">
              {" "}
              in {selectedCategory}
            </span>
          )}
          {activeMood && (
            <span className="text-[#6C7976] font-normal">
              {" "}
              matching &ldquo;{activeMood}&rdquo;
            </span>
          )}
        </p>
      </div>

      {/* Grid of Listings */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-[#E0D7C4] p-12 text-center space-y-4">
          <p className="font-serif text-2xl text-[#0E1B1A]">
            No places match your search
          </p>
          <p className="text-sm text-[#6C7976] max-w-md mx-auto">
            Try searching for another town, a different keyword, or switch back
            to all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              if (onClearMood) onClearMood();
            }}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-[#0E1B1A] bg-[#E0A030] hover:bg-[#F7BA4A] rounded-xl transition-colors cursor-pointer"
          >
            Show all listings
          </button>
        </div>
      )}
    </section>
  );
}
