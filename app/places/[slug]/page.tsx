import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seedPlaces } from "@/data/seed-places";
import { getPlaceWithReviews, getPlaces } from "@/lib/supabase";
import PhotoGallery from "@/components/photo-gallery";
import KeepWandering from "@/components/keep-wandering";
import PlacePageInteractions from "@/components/place-page-interactions";

interface PlacePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return seedPlaces.map((place) => ({
    slug: place.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceWithReviews(slug);

  if (!place) {
    return {
      title: "Place not found | Sanchaari",
    };
  }

  return {
    title: `${place.name}, ${place.city} | Sanchari`,
    description: place.teaser || place.description,
  };
}

export default async function PlaceDetailPage({ params }: PlacePageProps) {
  const { slug } = await params;
  const [place, allPlaces] = await Promise.all([
    getPlaceWithReviews(slug),
    getPlaces(),
  ]);

  if (!place) {
    notFound();
  }

  const quickFacts = place.quick_facts || {
    best_time: "October to March",
    getting_there: `Direct access via local transport in ${place.city}`,
    ideal_for: "Curious walkers, solitary readers",
    price_level: "Moderate",
  };

  const galleryPhotos = place.gallery && place.gallery.length > 0
    ? place.gallery
    : [place.photo_url];

  return (
    <article className="min-h-screen bg-[#F4EEE1] text-[#0E1B1A]">
      {/* Scroll reading progress & sticky action bar */}
      <PlacePageInteractions place={place} />

      {/* 1. Full-Bleed Cinematic Hero */}
      <div className="relative w-full h-[65vh] sm:h-[75vh] min-h-[520px] bg-[#0E1B1A] overflow-hidden">
        <Image
          src={place.photo_url}
          alt={place.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient Scrim for strong contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B1A] via-[#0E1B1A]/55 to-black/60" />
        <div className="absolute inset-0 film-grain pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col justify-between z-10 text-[#FAF7F0]">
          {/* Back Navigation */}
          <nav>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A030] hover:text-white transition-colors bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full"
            >
              <span aria-hidden="true">←</span>
              <span>All places</span>
            </Link>
          </nav>

          {/* Title and Curiosity Teaser */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-[#E0A030] text-[#0E1B1A] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {place.category}
              </span>
              {place.mood && (
                <span className="bg-white/20 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full">
                  {place.mood}
                </span>
              )}
              <span className="text-xs uppercase font-mono tracking-widest text-[#CBD5D3]">
                {place.city}, India
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              {place.name}
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#E0A030] leading-relaxed max-w-2xl">
              “{place.teaser || place.description}”
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs sm:text-sm text-[#CBD5D3]">
              <div className="flex items-center gap-1 text-[#E0A030]">
                <span>★</span>
                <span className="font-bold text-white">
                  {place.rating.toFixed(1)}
                </span>
              </div>
              <span>·</span>
              <span>
                {place.review_count}{" "}
                {place.review_count === 1 ? "visitor review" : "visitor reviews"}
              </span>
              <span>·</span>
              <span>{place.latitude.toFixed(4)}° N, {place.longitude.toFixed(4)}° E</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Facts Strip */}
      <section
        aria-label="Quick travel facts"
        className="border-b border-[#E0D7C4] bg-white py-6 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C7976] block mb-1">
                Best time to go
              </span>
              <p className="font-medium text-[#0E1B1A] text-sm">
                {quickFacts.best_time}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C7976] block mb-1">
                How to get there
              </span>
              <p className="font-medium text-[#0E1B1A] text-sm truncate">
                {quickFacts.getting_there}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C7976] block mb-1">
                Ideal for
              </span>
              <p className="font-medium text-[#0E1B1A] text-sm">
                {quickFacts.ideal_for}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C7976] block mb-1">
                Price level
              </span>
              <p className="font-medium text-[#0E1B1A] text-sm">
                {quickFacts.price_level}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Editorial Body & Sidebar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Story Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Backstory */}
            <section className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block">
                The backstory
              </span>
              <div className="font-serif text-lg sm:text-xl text-[#1E2E2C] leading-relaxed space-y-5">
                {(place.detailed_description || place.description)
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </section>

            {/* Photo Gallery with fullscreen lightbox & mobile swipe */}
            <PhotoGallery
              photos={galleryPhotos}
              placeName={place.name}
              credit={place.photo_credit}
            />

            {/* Practical Notes */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D7C4] space-y-4 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#0E1B1A]">
                Good to know before you arrive
              </h3>
              <ul className="space-y-3 text-sm text-[#4A5754] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#E0A030] mt-0.5" aria-hidden="true">
                    ✦
                  </span>
                  <span>
                    Exact coordinates: <strong>{place.latitude.toFixed(4)}° N, {place.longitude.toFixed(4)}° E</strong>. Mobile network is generally reliable in the main village.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E0A030] mt-0.5" aria-hidden="true">
                    ✦
                  </span>
                  <span>
                    Always keep small rupee notes handy for auto-rickshaws, tea stalls, and local boatmen, as UPI signals can dip in granite or forest valleys.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E0A030] mt-0.5" aria-hidden="true">
                    ✦
                  </span>
                  <span>
                    Respect local customs and resident privacy, especially during early morning walks through heritage hamlets.
                  </span>
                </li>
              </ul>
            </section>

            {/* Large Quote Visitor Reviews */}
            <section id="reviews-section" className="space-y-8 scroll-mt-24">
              <div className="flex items-end justify-between border-b border-[#E0D7C4] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block mb-1">
                    First-hand notes
                  </span>
                  <h3 className="font-serif text-3xl text-[#0E1B1A] font-bold">
                    What travellers say
                  </h3>
                </div>
                <span className="text-xs text-[#6C7976]">
                  {place.reviews?.length || 0} written
                </span>
              </div>

              {place.reviews && place.reviews.length > 0 ? (
                <div className="space-y-6">
                  {place.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D7C4] space-y-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-[#0E1B1A]">
                          {rev.author_name}
                        </span>
                        <div className="flex items-center gap-1 text-[#E0A030] text-sm">
                          {"★".repeat(rev.rating)}
                        </div>
                      </div>

                      <blockquote className="font-serif italic text-base sm:text-lg text-[#1E2E2C] leading-relaxed">
                        “{rev.text}”
                      </blockquote>

                      <div className="text-[11px] font-mono text-[#808C89] pt-1">
                        Visited in {rev.created_at}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-[#E0D7C4] text-center space-y-2">
                  <p className="font-serif italic text-base text-[#6C7976]">
                    No reviews yet. Been here? Tell people what it was like.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0D7C4] shadow-xs space-y-6 sticky top-24">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#6C7976] block mb-1">
                  Place type
                </span>
                <p className="font-serif text-2xl font-bold text-[#0E1B1A]">
                  {place.category === "Stay"
                    ? "A place to sleep"
                    : place.category === "Eat"
                    ? "A meal or drink"
                    : "A sight to see"}
                </p>
              </div>

              <div className="border-t border-[#F2ECE0] pt-4">
                <span className="text-xs uppercase font-mono tracking-wider text-[#6C7976] block mb-1">
                  Location
                </span>
                <p className="text-sm font-semibold text-[#0E1B1A]">
                  {place.city}, India
                </p>
              </div>

              {/* Affiliate Booking Button */}
              {place.affiliate_url && (
                <div className="border-t border-[#F2ECE0] pt-4 space-y-2">
                  <a
                    href={place.affiliate_url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-5 py-3.5 bg-[#E0A030] hover:bg-[#F7BA4A] text-[#0E1B1A] font-bold text-sm rounded-xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#0E1B1A]"
                  >
                    {place.category === "Stay"
                      ? "Book this stay"
                      : place.category === "Eat"
                      ? "Reserve a table"
                      : "Plan this visit"}
                  </a>
                  <p className="text-[11px] text-[#808C89] text-center italic">
                    Some links may earn Sanchaari a commission.
                  </p>
                </div>
              )}

              <div className="border-t border-[#F2ECE0] pt-4 space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#6C7976] block">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F4EEE1] px-2.5 py-1 rounded text-xs text-[#0E1B1A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#F2ECE0] pt-4">
                <span className="text-xs uppercase font-mono tracking-wider text-[#6C7976] block mb-1">
                  Permanent link
                </span>
                <code className="text-xs bg-[#F4EEE1] p-2 rounded block break-all text-[#0E1B1A] font-mono">
                  /places/{place.slug}
                </code>
              </div>
            </div>
          </aside>
        </div>

        {/* 4. Keep Wandering: 3 related destinations so there is never a dead end! */}
        <KeepWandering currentSlug={place.slug} places={allPlaces} />
      </div>
    </article>
  );
}
