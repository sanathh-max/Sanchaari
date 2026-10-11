"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Place, Mood } from "@/lib/types";
import PassportTracker from "./passport-tracker";

interface CinematicHeroProps {
  places: Place[];
  onSelectMood?: (mood: Mood) => void;
}

const MOOD_CHIPS: Mood[] = [
  "Mountains",
  "Backwaters",
  "Ruins",
  "Street food",
  "Slow stays",
  "Hidden trails",
];

export default function CinematicHero({
  places,
  onSelectMood,
}: CinematicHeroProps) {
  const router = useRouter();

  // Curate 5 striking hero destinations for the cinematic background carousel
  const heroPlaces = places.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parallax scroll hook
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Cycle through destinations every 6.5 seconds
  useEffect(() => {
    if (heroPlaces.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPlaces.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroPlaces.length]);

  const currentPlace = heroPlaces[currentIndex] || places[0];

  const handleSurpriseMe = () => {
    if (!places.length) return;
    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];
    router.push(`/places/${randomPlace.slug}`);
  };

  const handleMoodClick = (mood: Mood) => {
    if (onSelectMood) {
      onSelectMood(mood);
    }
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headlineWords = ["The", "places", "worth", "finding"];

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#0E1B1A] text-[#FAF7F0] flex flex-col justify-between">
      {/* Background Cycling Destination Photos with Ken Burns & Parallax */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentPlace.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentPlace.photo_url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Scrim Gradient and 35mm Film Grain Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B1A] via-[#0E1B1A]/65 to-[#0E1B1A]/80" />
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </motion.div>

      {/* Top Bar: Brand text logo and Passport tracker */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl sm:text-3xl tracking-tight text-[#FAF7F0] hover:text-[#E0A030] transition-colors"
        >
          Sanchaari
        </Link>

        <div className="flex items-center gap-4">
          <PassportTracker totalPlaces={places.length} />
        </div>
      </header>

      {/* Centerpiece: Cinematic Title Sequence and Mood Chips */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 py-12 flex flex-col items-start justify-center">
        <span className="text-xs uppercase font-medium tracking-widest text-[#E0A030] mb-4">
          Offbeat India · Stays, meals and sights
        </span>

        {/* Word-by-word rising kinetic typography */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight font-bold leading-[1.05] text-[#FAF7F0] mb-5">
          {headlineWords.map((word, index) => (
            <span
              key={word + index}
              className="inline-block overflow-hidden mr-3 sm:mr-4"
            >
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-xl text-[#CBD5D3] max-w-2xl font-normal leading-relaxed mb-8"
        >
          Stays, meals and sights, written up by people who actually went.
        </motion.p>

        {/* Mood Chips Row & Surprise Me Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-full flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          <span className="text-xs text-[#8E9D9A] mr-1 hidden sm:inline">
            What are you drawn to?
          </span>

          {MOOD_CHIPS.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => handleMoodClick(mood)}
              className="bg-[#152725]/80 hover:bg-[#E0A030] hover:text-[#0E1B1A] text-[#FAF7F0] border border-[#233D3A] text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              {mood}
            </button>
          ))}

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="inline-flex items-center gap-1.5 bg-[#B5502E] hover:bg-[#933E21] text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#E0A030]"
          >
            <span>Surprise me</span>
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Bar: Destination Badge in Corner + Scroll Indicator */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex items-end justify-between">
        {/* Animated Corner Card: "Where is that?" curiosity hook */}
        <Link
          href={`/places/${currentPlace.slug}`}
          data-cursor="View"
          className="group bg-[#152725]/90 hover:bg-[#1E3634] border border-[#233D3A] p-2.5 sm:p-3 rounded-xl max-w-xs transition-all backdrop-blur-md"
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#E0A030] block">
            Featured location · 0{currentIndex + 1} / 0{heroPlaces.length}
          </span>
          <span className="font-serif text-sm font-semibold text-[#FAF7F0] group-hover:text-[#E0A030] transition-colors block mt-0.5 truncate">
            {currentPlace.name}
          </span>
          <span className="text-xs text-[#8E9D9A]">
            {currentPlace.city}, India
          </span>
        </Link>

        {/* Scroll down indicator */}
        <a
          href="#explore"
          className="hidden sm:flex flex-col items-center gap-2 text-[11px] uppercase tracking-widest text-[#8E9D9A] hover:text-[#FAF7F0] transition-colors"
        >
          <span>Scroll to wander</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-5 rounded-full bg-[#E0A030]/80"
          />
        </a>
      </div>
    </section>
  );
}
