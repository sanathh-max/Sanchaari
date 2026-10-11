import Image from "next/image";
import Link from "next/link";
import { Place } from "@/lib/types";

interface KeepWanderingProps {
  currentSlug: string;
  places: Place[];
}

export default function KeepWandering({
  currentSlug,
  places,
}: KeepWanderingProps) {
  const relatedPlaces = places
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPlaces.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-[#E0D7C4]">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-[#B5502E] font-semibold block mb-2">
          Never a dead end
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#0E1B1A] font-bold tracking-tight">
          Keep wandering
        </h2>
        <p className="text-sm text-[#6C7976] mt-1">
          Three more quiet corners worth finding on the subcontinent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPlaces.map((place) => (
          <Link
            key={place.id}
            href={`/places/${place.slug}`}
            data-cursor="View"
            className="group block bg-white rounded-2xl overflow-hidden border border-[#E0D7C4] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EAE1D0]">
              <Image
                src={place.photo_url}
                alt={place.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3 left-3 bg-[#0E1B1A]/85 text-[#FAF7F0] text-xs font-medium px-2.5 py-0.5 rounded-full">
                {place.category}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#6C7976] block">
                {place.city}, India
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0E1B1A] group-hover:text-[#B5502E] transition-colors leading-snug line-clamp-1">
                {place.name}
              </h3>
              <p className="font-serif italic text-xs text-[#0E1B1A]/80 line-clamp-2 leading-relaxed">
                &ldquo;{place.teaser}&rdquo;
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
