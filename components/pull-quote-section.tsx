import Link from "next/link";

export default function PullQuoteSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0E1B1A] text-[#FAF7F0] overflow-hidden">
      {/* 35mm film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-8">
        <div className="flex items-center justify-center gap-1.5 text-[#E0A030] text-lg sm:text-xl">
          {"★".repeat(5)}
        </div>

        <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#FAF7F0] font-normal leading-snug tracking-tight">
          “The trek down is tough on the knees, but having the turquoise river
          pools completely to yourself at six in the morning makes every single
          step worth it.”
        </blockquote>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-[#E0A030] uppercase tracking-widest">
            Lalita Roy · Travelled August 2026
          </p>
          <p className="text-sm text-[#8E9D9A]">
            Written about{" "}
            <span className="text-[#FAF7F0]">
              Nongriat Living Root Bridge Cottage
            </span>
            , Meghalaya
          </p>

          <div className="pt-4">
            <Link
              href="/places/nongriat-stilt-cottage-meghalaya"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FAF7F0] hover:text-[#E0A030] border-b border-[#E0A030] pb-1 transition-colors"
            >
              <span>Read the rest of the story</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
