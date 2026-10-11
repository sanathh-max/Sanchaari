-- ============================================================
-- SANCHAARI DATABASE SCHEMA & SEED DATA
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ============================================================

-- 1. Create the 'places' table
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Stay', 'Eat', 'See')),
  description TEXT NOT NULL,
  detailed_description TEXT,
  photo_url TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  tags TEXT[] DEFAULT '{}',
  affiliate_url TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'pending', 'hidden')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the 'reviews' table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID REFERENCES places(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT 'Fellow traveller',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
-- RLS ensures safety rules are enforced at the database level
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for 'places'
-- Anyone (visitors and members) can read published places
CREATE POLICY "Public can view published places"
  ON places
  FOR SELECT
  USING (status = 'published');

-- Visitors can submit new suggestions with 'pending' status
CREATE POLICY "Public can suggest places"
  ON places
  FOR INSERT
  WITH CHECK (status = 'pending');

-- 5. RLS Policies for 'reviews'
-- Anyone can read reviews
CREATE POLICY "Public can view reviews"
  ON reviews
  FOR SELECT
  USING (true);

-- Only logged-in users can write their own reviews
CREATE POLICY "Logged in users can insert reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Logged-in users can update only their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Logged-in users can delete only their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 6. Insert the 9 seed places across India
-- ============================================================
INSERT INTO places (id, slug, name, city, category, description, detailed_description, photo_url, latitude, longitude, tags, affiliate_url, status)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'kashi-art-cafe-kochi',
    'Kashi Art Cafe',
    'Kochi',
    'Eat',
    'A quiet courtyard on Burgher Street serving roast chicken sandwiches, black coffee, and warm chocolate cake under rain trees.',
    'Tucked behind a narrow doorway on Burgher Street, Kashi is where you go when the midday humidity in Fort Kochi gets heavy. The cafe opens into a skylit courtyard with rough stone floors, rotating contemporary sculptures, and ceiling fans that stir the warm coastal breeze.

The menu is short and dependable. The roast chicken sandwich on whole wheat bread is hearty, and their dense chocolate cake with cold pour-over coffee has been a Fort Kochi ritual for decades. Come around ten in the morning on weekdays to read a book in peace before the art crowd wanders in.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    9.9658,
    76.2422,
    ARRAY['Courtyard', 'Filter coffee', 'Art space'],
    NULL,
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'airlines-hotel-bengaluru',
    'Airlines Hotel Courtyard',
    'Bengaluru',
    'Eat',
    'An open-air drive-in under spreading banyan trees on Madras Bank Road with crisp masala dosas and strong filter coffee.',
    'Airlines has stayed stubbornly unchanged while the rest of central Bengaluru built glass towers around it. You sit on concrete benches or roll down your car window under massive canopies of old banyans and gulmohar trees.

The waiters balance metal trays loaded with piping hot khara bath, crisp butter masala dosas, and froth-topped steel tumblers of degree coffee. Morning walkers from Cubbon Park start arriving by seven. It is noisy, grounded, and one of the last places where old Bengaluru still gathers without pretension.',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    12.9716,
    77.5946,
    ARRAY['Breakfast', 'Open air', 'Old town'],
    NULL,
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'boulders-hideaway-hampi',
    'Boulders Hideaway by the Tungabhadra',
    'Hampi',
    'Stay',
    'Simple stone rooms set into ancient granite formations on the quieter Anegundi side of the river.',
    'Located across the Tungabhadra river from the main temple complex, this retreat sits directly amid gigantic rust-colored granite boulders. The cottages are built using local stone and clay tiles, keeping them pleasantly cool during the baking afternoons.

At night you hear the river rapids and crickets. There is no loud music or television. In the early morning, local coracles take you across to the ruins, or you can walk up Sanapur Lake for a swim in clean freshwater. Bring good walking shoes and insect repellent for dusk.',
    'https://images.unsplash.com/photo-1600100397608-f010f4439c65?auto=format&fit=crop&w=1200&q=80',
    15.3350,
    76.4600,
    ARRAY['Riverside', 'Stargazing', 'Heritage'],
    'https://example.com/book-boulders-hampi',
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'kuttanad-canal-canoe-trail-alleppey',
    'Kuttanad Canal Canoe Trail',
    'Alleppey',
    'See',
    'Narrow waterway canals through paddy fields below sea level, best explored on a silent wooden rowboat at dawn.',
    'Most visitors hire large motorized houseboats that stay on the main lake, but the real heart of the backwaters is in the narrow, silent canals of Kuttanad. Here, people farm four to ten feet below sea level.

A local boatman paddles a small wooden canoe through village waterways draped in coconut palms and water hyacinths. You pass ducks paddling past village kitchens, children crossing footbridges on their way to school, and kingfishers dipping into the morning water. The morning light filtering through the palms is something you will remember for years.',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    9.4981,
    76.3388,
    ARRAY['Waterway', 'Slow travel', 'Morning'],
    NULL,
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'yazdani-bakery-mumbai',
    'Yazdani Bakery and Chai Shop',
    'Mumbai',
    'Eat',
    'A heritage wood-fired Irani bakery in the lanes of Fort serving crusty brun maska, apple pie, and ginger chai.',
    'Stepping into Yazdani on Cawasji Patel Street is like stepping into 1953. The aroma of sourdough baking in a cavernous century-old wood-fired oven hits you before you cross the threshold. The walls are covered in vintage posters, grandfather clocks, and hand-painted baking certificates.

The ritual is unpretentious: order a brun maska (a round bread with a crust as crisp as ceramic and a pillow-soft crumb inside, slathered in salted butter) and dunk it straight into a glass of piping hot ginger chai. Don''t leave without a slice of their cinnamon-spiced apple pie.',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    18.9322,
    72.8335,
    ARRAY['Irani chai', 'Heritage bake', 'Fort'],
    NULL,
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'nongriat-stilt-cottage-meghalaya',
    'Nongriat Living Root Bridge Cottage',
    'Meghalaya',
    'Stay',
    'A rustic bamboo and wood homestay at the bottom of the gorge near the double-decker living root bridges.',
    'Reaching Nongriat requires descending roughly three thousand stone steps into the deep rainforest valley outside Cherrapunji. Most day-trippers rush back up the steps before dark, but staying the night in the village changes everything.

This simple community-run stilt cottage looks out over dense betel nut trees and crystal turquoise river pools. In the evening, the valley falls completely quiet except for the roar of nearby waterfalls. Dinner is steaming red rice, boiled greens from the forest, and lentils cooked over a hearth fire.',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    25.2514,
    91.6872,
    ARRAY['Rainforest', 'Living roots', 'Homestay'],
    'https://example.com/book-nongriat-stay',
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'taneerhulla-coffee-homestay-coorg',
    'Taneerhulla Estate Coffee Homestay',
    'Coorg',
    'Stay',
    'A quiet tiled-roof bungalow surrounded by shade-grown arabica, silver oaks, and pepper vines in south Kodagu.',
    'Located deep inside a multi-generation coffee estate away from the busy Madikeri road, Taneerhulla offers an intimate glimpse into plantation life. The bungalow has broad verandahs with cane planters'' chairs, red oxide floors, and a garden frequented by hornbills and emerald doves.

Your hosts serve traditional Kodava dishes: pandi curry with soft steamed akki rotis, bamboo shoot fry, and estate-roasted coffee brewed fresh each morning. During the monsoon, mist rolls in through the trees by three in the afternoon, making it ideal for reading by the fireplace.',
    'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    12.3375,
    75.8069,
    ARRAY['Plantation', 'Home cooked', 'Verandah'],
    'https://example.com/book-taneerhulla-coorg',
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'mehrauli-forest-steps-delhi',
    'Jamali Kamali and Mehrauli Forest Steps',
    'Delhi',
    'See',
    'Sixteenth-century sandstone tombs, quiet colonnades, and forgotten stepwells hidden inside a sprawling wooded park.',
    'While crowds line up outside the Qutub Minar complex nearby, few wander just five hundred meters south into the Mehrauli Archaeological Park. Spread across two hundred acres of acacia forest are over a hundred historical monuments dating from the Khalji and Mughal eras.

The Jamali Kamali mosque features finely incised plasterwork and a ceiling painted in lapis lazuli and vermilion. Further down a dirt trail sits Rajon ki Baoli, a stepwell whose tiered arched galleries remain cool even in the heat of a Delhi June. Early morning is the best time, when peacocks call from the stone walls.',
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    28.5218,
    77.1855,
    ARRAY['Ruins', 'Stepwell', 'Quiet walk'],
    NULL,
    'published'
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'fontainhas-latin-quarter-goa',
    'Fontainhas Latin Quarter Alleys',
    'Goa',
    'See',
    'A peaceful heritage neighborhood in Panaji with ochre and indigo Portuguese villas, quiet bakeries, and azulejo tiles.',
    'Fontainhas lies nestled between Altinho hill and the Ourem creek in Panaji. Built in the late eighteenth century, the neighborhood retains narrow cobblestone lanes lined with Portuguese-style homes painted in vivid hues of pale yellow, terracotta, and indigo blue.

Every home has wrought iron balconies, oyster shell window panes, and decorative ceramic house number plates. Walk early in the morning when the local baker delivers fresh poee bread by bicycle, or stop by the tiny Confeitaria 31 de Janeiro for a warm bolo de noz (walnut cake) and espresso.',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    15.4989,
    73.8311,
    ARRAY['Architecture', 'Heritage walk', 'Quiet'],
    NULL,
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- 7. Insert sample reviews into the 'reviews' table
INSERT INTO reviews (place_id, author_name, rating, text, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Arjun Nair', 5, 'The courtyard is breezy even in April. Order the cold coffee and the French toast. They take their time with the food, so don''t come in a hurry.', now() - interval '27 days'),
  ('00000000-0000-0000-0000-000000000001', 'Tara Sen', 4, 'Quiet spot to sit and write. The chocolate cake is as rich as everyone says. Parking on the lane is tricky, so walk or take an auto.', now() - interval '44 days'),
  ('00000000-0000-0000-0000-000000000002', 'Karthik Rao', 5, 'Walk through Cubbon Park early morning and finish here with an upma and filter coffee. Nothing beats sitting under those old trees.', now() - interval '39 days'),
  ('00000000-0000-0000-0000-000000000002', 'Sneha Menon', 4, 'Gets crowded after eight thirty on weekends. Service is brisk and the sambar is slightly sweet in the old Bangalore style.', now() - interval '84 days'),
  ('00000000-0000-0000-0000-000000000003', 'Devika Joshi', 5, 'Waking up to giant red boulders right outside your door is unforgettable. Simple home-cooked dal and roti for dinner.', now() - interval '21 days'),
  ('00000000-0000-0000-0000-000000000004', 'Rahul Verma', 5, 'Skip the diesel houseboats and hire a small row canoe at 6:30 am. You get to see everyday village life up close and in total silence.', now() - interval '61 days'),
  ('00000000-0000-0000-0000-000000000005', 'Farhan Merchant', 5, 'The brun maska here has that distinctive wood-fired smokiness you cannot find anywhere else in Bombay. Grab a paper bag of ginger biscuits on your way out.', now() - interval '33 days'),
  ('00000000-0000-0000-0000-000000000006', 'Lalita Roy', 5, 'The trek down is tough on the knees, but having the turquoise river pools completely to yourself at 6 am makes every single step worth it.', now() - interval '42 days'),
  ('00000000-0000-0000-0000-000000000007', 'Bopanna Cariappa', 5, 'Authentic Kodava hospitality without the commercial resort feel. The estate walk with the manager was very educational.', now() - interval '29 days'),
  ('00000000-0000-0000-0000-000000000008', 'Ananya Saxena', 5, 'One of the most peaceful walks in Delhi. Enter from the Mehrauli gate early on a Sunday morning before the city wakes up.', now() - interval '37 days'),
  ('00000000-0000-0000-0000-000000000009', 'Vivian D''Souza', 5, 'Wandering these lanes at 7 am is a completely different side of Goa that most tourists never see. Respect the residents'' privacy while taking photos.', now() - interval '53 days')
ON CONFLICT DO NOTHING;
