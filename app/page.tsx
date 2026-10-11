import { getPlaces } from "@/lib/supabase";
import HomePageClient from "@/components/home-page-client";

export default async function HomePage() {
  const places = await getPlaces();

  return <HomePageClient places={places} />;
}
