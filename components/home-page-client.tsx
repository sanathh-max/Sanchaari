"use client";

import { useState } from "react";
import { Place, Mood } from "@/lib/types";
import CinematicHero from "./cinematic-hero";
import FoundThisWeekRail from "./found-this-week-rail";
import InteractiveIndiaMap from "./interactive-india-map";
import PullQuoteSection from "./pull-quote-section";
import PlaceExplorer from "./place-explorer";

interface HomePageClientProps {
  places: Place[];
}

export default function HomePageClient({ places }: HomePageClientProps) {
  const [activeMood, setActiveMood] = useState<Mood | null>(null);

  return (
    <>
      {/* 1. The First Screen: Cinematic Full-Screen Hero */}
      <CinematicHero
        places={places}
        onSelectMood={(mood) => setActiveMood(mood)}
      />

      {/* 2. Found This Week: Tilt-card horizontal scroll rail */}
      <FoundThisWeekRail places={places} />

      {/* 3. Interactive Atlas: Stylized India map with glowing beacons */}
      <InteractiveIndiaMap places={places} />

      {/* 4. Cinematic Pull Quote: Full-bleed review in 48px Fraunces */}
      <PullQuoteSection />

      {/* 5. The Curated Index: Search, category filters, and place cards */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <PlaceExplorer
          initialPlaces={places}
          activeMood={activeMood}
          onClearMood={() => setActiveMood(null)}
        />
      </div>
    </>
  );
}
