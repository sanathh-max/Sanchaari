import { createClient } from "@supabase/supabase-js";
import { Place, Review } from "./types";
import { seedPlaces, getPlaceBySlug as getSeedPlaceBySlug } from "@/data/seed-places";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if valid Supabase credentials have been provided
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      !supabaseUrl.includes("your-project-ref") &&
      !supabaseAnonKey.includes("your-supabase-anon-key") &&
      supabaseUrl.startsWith("https://")
  );
}

// Single instance of Supabase client for client-side and simple server-side queries
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Fetch all published places from Supabase (or fallback to seed places if not connected yet)
export async function getPlaces(): Promise<Place[]> {
  if (!supabase) {
    return seedPlaces;
  }

  try {
    // 1. Fetch all published places
    const { data: placesData, error: placesError } = await supabase
      .from("places")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: true });

    if (placesError || !placesData || placesData.length === 0) {
      console.warn("Could not load places from Supabase, using seed places fallback:", placesError?.message);
      return seedPlaces;
    }

    // 2. Fetch all reviews to compute accurate review counts and ratings
    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("place_id, rating");

    const reviewsByPlaceId = new Map<string, number[]>();
    if (reviewsData) {
      for (const rev of reviewsData) {
        const ratings = reviewsByPlaceId.get(rev.place_id) || [];
        ratings.push(rev.rating);
        reviewsByPlaceId.set(rev.place_id, ratings);
      }
    }

    // 3. Map database rows to our Place type
    return placesData.map((row) => {
      const ratings = reviewsByPlaceId.get(row.id) || [];
      const reviewCount = ratings.length;
      const averageRating =
        reviewCount > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / reviewCount
          : 5.0;

      const seed = getSeedPlaceBySlug(row.slug);

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        city: row.city,
        category: row.category,
        mood: row.mood || seed?.mood || "Slow stays",
        teaser: row.teaser || seed?.teaser || row.description,
        description: row.description,
        detailed_description: row.detailed_description,
        photo_url: row.photo_url,
        gallery: row.gallery || seed?.gallery || [row.photo_url],
        photo_credit: row.photo_credit || seed?.photo_credit || "Unsplash",
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        tags: Array.isArray(row.tags) ? row.tags : [],
        affiliate_url: row.affiliate_url,
        status: row.status,
        rating: Math.round(averageRating * 10) / 10,
        review_count: reviewCount,
        quick_facts: row.quick_facts || seed?.quick_facts,
        created_at: row.created_at,
      };
    });
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return seedPlaces;
  }
}

// Fetch a single place by slug along with its reviews
export async function getPlaceWithReviews(slug: string): Promise<Place | null> {
  if (!supabase) {
    const seed = getSeedPlaceBySlug(slug);
    return seed || null;
  }

  try {
    const { data: placeData, error: placeError } = await supabase
      .from("places")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (placeError || !placeData) {
      // Fallback to seed in case database is still being populated
      const seed = getSeedPlaceBySlug(slug);
      return seed || null;
    }

    // Fetch reviews for this place
    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("*")
      .eq("place_id", placeData.id)
      .order("created_at", { ascending: false });

    const reviews: Review[] = (reviewsData || []).map((r) => ({
      id: r.id,
      place_id: r.place_id,
      user_id: r.user_id,
      author_name: r.author_name || "Fellow traveller",
      rating: r.rating,
      text: r.text,
      created_at: new Date(r.created_at).toISOString().split("T")[0],
    }));

    const reviewCount = reviews.length;
    const averageRating =
      reviewCount > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 5.0;

    const seed = getSeedPlaceBySlug(slug);

    return {
      id: placeData.id,
      slug: placeData.slug,
      name: placeData.name,
      city: placeData.city,
      category: placeData.category,
      mood: placeData.mood || seed?.mood || "Slow stays",
      teaser: placeData.teaser || seed?.teaser || placeData.description,
      description: placeData.description,
      detailed_description: placeData.detailed_description,
      photo_url: placeData.photo_url,
      gallery: placeData.gallery || seed?.gallery || [placeData.photo_url],
      photo_credit: placeData.photo_credit || seed?.photo_credit || "Unsplash",
      latitude: Number(placeData.latitude),
      longitude: Number(placeData.longitude),
      tags: Array.isArray(placeData.tags) ? placeData.tags : [],
      affiliate_url: placeData.affiliate_url,
      status: placeData.status,
      rating: Math.round(averageRating * 10) / 10,
      review_count: reviewCount,
      quick_facts: placeData.quick_facts || seed?.quick_facts,
      reviews,
      created_at: placeData.created_at,
    };
  } catch (err) {
    console.error("Error fetching place by slug from Supabase:", err);
    return getSeedPlaceBySlug(slug) || null;
  }
}
