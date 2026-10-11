// TypeScript interfaces for Sanchaari

export type Category = "Stay" | "Eat" | "See";

export type Mood =
  | "Mountains"
  | "Backwaters"
  | "Ruins"
  | "Street food"
  | "Slow stays"
  | "Hidden trails";

export interface QuickFacts {
  best_time: string;
  getting_there: string;
  ideal_for: string;
  price_level: string;
}

export interface Review {
  id: string;
  place_id: string;
  user_id?: string | null;
  author_name: string;
  rating: number; // 1 to 5
  text: string;
  created_at: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  city: string;
  category: Category;
  mood?: Mood;
  teaser: string; // One-line evocative curiosity hook in italic Fraunces
  description: string;
  detailed_description?: string;
  photo_url: string;
  gallery?: string[];
  photo_credit?: string;
  latitude: number;
  longitude: number;
  tags: string[];
  affiliate_url?: string | null;
  status: "published" | "pending" | "hidden";
  rating: number;
  review_count: number;
  quick_facts?: QuickFacts;
  reviews?: Review[];
  created_at?: string;
}
