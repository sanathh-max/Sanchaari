import { Place } from "@/lib/types";

// 9 seed listings across India with cinematic teasers, quick facts, and galleries
export const seedPlaces: Place[] = [
  {
    id: "1",
    slug: "kashi-art-cafe-kochi",
    name: "Kashi Art Cafe",
    city: "Kochi",
    category: "Eat",
    mood: "Street food",
    teaser:
      "A rain-washed stone courtyard where cold coffee and warm chocolate cake outlast the midday humidity.",
    description:
      "A quiet courtyard on Burgher Street serving roast chicken sandwiches, black coffee, and warm chocolate cake under rain trees.",
    detailed_description:
      "Tucked behind a narrow doorway on Burgher Street, Kashi is where you go when the midday humidity in Fort Kochi gets heavy. The cafe opens into a skylit courtyard with rough stone floors, rotating contemporary sculptures, and ceiling fans that stir the warm coastal breeze.\n\nThe menu is short and dependable. The roast chicken sandwich on whole wheat bread is hearty, and their dense chocolate cake with cold pour-over coffee has been a Fort Kochi ritual for decades. Come around ten in the morning on weekdays to read a book in peace before the art crowd wanders in.",
    photo_url:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Pratiksha Mohanty",
    latitude: 9.9658,
    longitude: 76.2422,
    tags: ["Courtyard", "Filter coffee", "Art space"],
    affiliate_url: null,
    status: "published",
    rating: 4.8,
    review_count: 14,
    quick_facts: {
      best_time: "November to March",
      getting_there: "Ferry or auto from Ernakulam jetty to Fort Kochi",
      ideal_for: "Solo readers, art lovers, afternoon unwinding",
      price_level: "₹300 - ₹600 per person",
    },
    reviews: [
      {
        id: "rev-1",
        place_id: "1",
        author_name: "Arjun Nair",
        rating: 5,
        text: "The courtyard is breezy even in April. Order the cold coffee and the French toast. They take their time with the food, so don't come in a hurry.",
        created_at: "2026-09-14",
      },
      {
        id: "rev-2",
        place_id: "1",
        author_name: "Tara Sen",
        rating: 4,
        text: "Quiet spot to sit and write. The chocolate cake is as rich as everyone says. Parking on the lane is tricky, so walk or take an auto.",
        created_at: "2026-08-28",
      },
    ],
  },
  {
    id: "2",
    slug: "airlines-hotel-bengaluru",
    name: "Airlines Hotel Courtyard",
    city: "Bengaluru",
    category: "Eat",
    mood: "Street food",
    teaser:
      "Strong filter coffee served under ancient banyans while the rest of the city turns to glass.",
    description:
      "An open-air drive-in under spreading banyan trees on Madras Bank Road with crisp masala dosas and strong filter coffee.",
    detailed_description:
      "Airlines has stayed stubbornly unchanged while the rest of central Bengaluru built glass towers around it. You sit on concrete benches or roll down your car window under massive canopies of old banyans and gulmohar trees.\n\nThe waiters balance metal trays loaded with piping hot khara bath, crisp butter masala dosas, and froth-topped steel tumblers of degree coffee. Morning walkers from Cubbon Park start arriving by seven. It is noisy, grounded, and one of the last places where old Bengaluru still gathers without pretension.",
    photo_url:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Shashi Ch",
    latitude: 12.9716,
    longitude: 77.5946,
    tags: ["Breakfast", "Open air", "Old town"],
    affiliate_url: null,
    status: "published",
    rating: 4.6,
    review_count: 22,
    quick_facts: {
      best_time: "Early mornings year-round (7:00 am - 9:00 am)",
      getting_there: "Walk through Cubbon Park or drive to Madras Bank Road",
      ideal_for: "Morning walkers, dosa purists, casual chats",
      price_level: "₹150 - ₹300 per person",
    },
    reviews: [
      {
        id: "rev-3",
        place_id: "2",
        author_name: "Karthik Rao",
        rating: 5,
        text: "Walk through Cubbon Park early morning and finish here with an upma and filter coffee. Nothing beats sitting under those old trees.",
        created_at: "2026-09-02",
      },
      {
        id: "rev-4",
        place_id: "2",
        author_name: "Sneha Menon",
        rating: 4,
        text: "Gets crowded after eight thirty on weekends. Service is brisk and the sambar is slightly sweet in the old Bangalore style.",
        created_at: "2026-07-19",
      },
    ],
  },
  {
    id: "3",
    slug: "boulders-hideaway-hampi",
    name: "Boulders Hideaway by the Tungabhadra",
    city: "Hampi",
    category: "Stay",
    mood: "Ruins",
    teaser:
      "Stone rooms built into two-billion-year-old granite boulders across the sacred river.",
    description:
      "Simple stone rooms set into ancient granite formations on the quieter Anegundi side of the river.",
    detailed_description:
      "Located across the Tungabhadra river from the main temple complex, this retreat sits directly amid gigantic rust-colored granite boulders. The cottages are built using local stone and clay tiles, keeping them pleasantly cool during the baking afternoons.\n\nAt night you hear the river rapids and crickets. There is no loud music or television. In the early morning, local coracles take you across to the ruins, or you can walk up Sanapur Lake for a swim in clean freshwater. Bring good walking shoes and insect repellent for dusk.",
    photo_url:
      "https://images.unsplash.com/photo-1600100397608-f010f4439c65?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f4439c65?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Sanat Joshi",
    latitude: 15.335,
    longitude: 76.46,
    tags: ["Riverside", "Stargazing", "Heritage"],
    affiliate_url: "https://example.com/book-boulders-hampi",
    status: "published",
    rating: 4.9,
    review_count: 18,
    quick_facts: {
      best_time: "October to February",
      getting_there: "Train to Hospet, then 30 min auto to Anegundi side",
      ideal_for: "Stargazers, slow readers, boulderers",
      price_level: "₹2,800 - ₹4,200 per night",
    },
    reviews: [
      {
        id: "rev-5",
        place_id: "3",
        author_name: "Devika Joshi",
        rating: 5,
        text: "Waking up to giant red boulders right outside your door is unforgettable. Simple home-cooked dal and roti for dinner.",
        created_at: "2026-09-20",
      },
    ],
  },
  {
    id: "4",
    slug: "kuttanad-canal-canoe-trail-alleppey",
    name: "Kuttanad Canal Canoe Trail",
    city: "Alleppey",
    category: "See",
    mood: "Backwaters",
    teaser:
      "Silent wooden rowboats through village canals where farmers work four feet below sea level.",
    description:
      "Narrow waterway canals through paddy fields below sea level, best explored on a silent wooden rowboat at dawn.",
    detailed_description:
      "Most visitors hire large motorized houseboats that stay on the main lake, but the real heart of the backwaters is in the narrow, silent canals of Kuttanad. Here, people farm four to ten feet below sea level.\n\nA local boatman paddles a small wooden canoe through village waterways draped in coconut palms and water hyacinths. You pass ducks paddling past village kitchens, children crossing footbridges on their way to school, and kingfishers dipping into the morning water. The morning light filtering through the palms is something you will remember for years.",
    photo_url:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Kyungho Stott",
    latitude: 9.4981,
    longitude: 76.3388,
    tags: ["Waterway", "Slow travel", "Morning"],
    affiliate_url: null,
    status: "published",
    rating: 4.9,
    review_count: 11,
    quick_facts: {
      best_time: "August to March (dawn hours around 6:00 am)",
      getting_there: "Local bus or ferry from Alleppey town to Nedumudy jetty",
      ideal_for: "Photographers, birders, early risers",
      price_level: "₹600 - ₹1,000 for a 3-hour canoe paddle",
    },
    reviews: [
      {
        id: "rev-6",
        place_id: "4",
        author_name: "Rahul Verma",
        rating: 5,
        text: "Skip the diesel houseboats and hire a small row canoe at 6:30 am. You get to see everyday village life up close and in total silence.",
        created_at: "2026-08-11",
      },
    ],
  },
  {
    id: "5",
    slug: "yazdani-bakery-mumbai",
    name: "Yazdani Bakery and Chai Shop",
    city: "Mumbai",
    category: "Eat",
    mood: "Street food",
    teaser:
      "Wood-fired Irani crusts dipped in ginger chai inside a bakery that stopped time in 1953.",
    description:
      "A heritage wood-fired Irani bakery in the lanes of Fort serving crusty brun maska, apple pie, and ginger chai.",
    detailed_description:
      "Stepping into Yazdani on Cawasji Patel Street is like stepping into 1953. The aroma of sourdough baking in a cavernous century-old wood-fired oven hits you before you cross the threshold. The walls are covered in vintage posters, grandfather clocks, and hand-painted baking certificates.\n\nThe ritual is unpretentious: order a brun maska (a round bread with a crust as crisp as ceramic and a pillow-soft crumb inside, slathered in salted butter) and dunk it straight into a glass of piping hot ginger chai. Don't leave without a slice of their cinnamon-spiced apple pie.",
    photo_url:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Mae Mu",
    latitude: 18.9322,
    longitude: 72.8335,
    tags: ["Irani chai", "Heritage bake", "Fort"],
    affiliate_url: null,
    status: "published",
    rating: 4.7,
    review_count: 31,
    quick_facts: {
      best_time: "Mornings before 11:00 am for fresh hot bread",
      getting_there: "Short walk from Churchgate or CST station into Fort",
      ideal_for: "History buffs, tea lovers, sourdough purists",
      price_level: "₹80 - ₹180 per person",
    },
    reviews: [
      {
        id: "rev-7",
        place_id: "5",
        author_name: "Farhan Merchant",
        rating: 5,
        text: "The brun maska here has that distinctive wood-fired smokiness you cannot find anywhere else in Bombay. Grab a paper bag of ginger biscuits on your way out.",
        created_at: "2026-09-08",
      },
    ],
  },
  {
    id: "6",
    slug: "nongriat-stilt-cottage-meghalaya",
    name: "Nongriat Living Root Bridge Cottage",
    city: "Meghalaya",
    category: "Stay",
    mood: "Hidden trails",
    teaser:
      "3,000 stone steps down to a rainforest gorge where living tree roots bridge turquoise river pools.",
    description:
      "A rustic bamboo and wood homestay at the bottom of the gorge near the double-decker living root bridges.",
    detailed_description:
      "Reaching Nongriat requires descending roughly three thousand stone steps into the deep rainforest valley outside Cherrapunji. Most day-trippers rush back up the steps before dark, but staying the night in the village changes everything.\n\nThis simple community-run stilt cottage looks out over dense betel nut trees and crystal turquoise river pools. In the evening, the valley falls completely quiet except for the roar of nearby waterfalls. Dinner is steaming red rice, boiled greens from the forest, and lentils cooked over a hearth fire.",
    photo_url:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Bailey Zindel",
    latitude: 25.2514,
    longitude: 91.6872,
    tags: ["Rainforest", "Living roots", "Homestay"],
    affiliate_url: "https://example.com/book-nongriat-stay",
    status: "published",
    rating: 4.9,
    review_count: 15,
    quick_facts: {
      best_time: "October to April (avoid monsoon peak for hiking)",
      getting_there: "Taxi from Shillong to Tyrna, then hike down 3,500 steps",
      ideal_for: "Trekkers, wild swimmers, nature lovers",
      price_level: "₹1,200 - ₹2,000 per night (includes dinner)",
    },
    reviews: [
      {
        id: "rev-8",
        place_id: "6",
        author_name: "Lalita Roy",
        rating: 5,
        text: "The trek down is tough on the knees, but having the turquoise river pools completely to yourself at 6 am makes every single step worth it.",
        created_at: "2026-08-30",
      },
    ],
  },
  {
    id: "7",
    slug: "taneerhulla-coffee-homestay-coorg",
    name: "Taneerhulla Estate Coffee Homestay",
    city: "Coorg",
    category: "Stay",
    mood: "Slow stays",
    teaser:
      "A broad verandah surrounded by shade-grown coffee, mountain mist, and homemade pandi curry.",
    description:
      "A quiet tiled-roof bungalow surrounded by shade-grown arabica, silver oaks, and pepper vines in south Kodagu.",
    detailed_description:
      "Located deep inside a multi-generation coffee estate away from the busy Madikeri road, Taneerhulla offers an intimate glimpse into plantation life. The bungalow has broad verandahs with cane planters' chairs, red oxide floors, and a garden frequented by hornbills and emerald doves.\n\nYour hosts serve traditional Kodava dishes: pandi curry with soft steamed akki rotis, bamboo shoot fry, and estate-roasted coffee brewed fresh each morning. During the monsoon, mist rolls in through the trees by three in the afternoon, making it ideal for reading by the fireplace.",
    photo_url:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Biju Boro",
    latitude: 12.3375,
    longitude: 75.8069,
    tags: ["Plantation", "Home cooked", "Verandah"],
    affiliate_url: "https://example.com/book-taneerhulla-coorg",
    status: "published",
    rating: 4.8,
    review_count: 19,
    quick_facts: {
      best_time: "October to May for pleasant days; July for monsoon mist",
      getting_there: "Drive from Mysuru (2.5 hrs) or Bengaluru (5 hrs)",
      ideal_for: "Families, couples, book readers",
      price_level: "₹4,500 - ₹6,500 per night (meals included)",
    },
    reviews: [
      {
        id: "rev-9",
        place_id: "7",
        author_name: "Bopanna Cariappa",
        rating: 5,
        text: "Authentic Kodava hospitality without the commercial resort feel. The estate walk with the manager was very educational.",
        created_at: "2026-09-12",
      },
    ],
  },
  {
    id: "8",
    slug: "mehrauli-forest-steps-delhi",
    name: "Jamali Kamali and Mehrauli Forest Steps",
    city: "Delhi",
    category: "See",
    mood: "Ruins",
    teaser:
      "Sixteenth-century stepwells and forgotten blue-tiled tombs hidden inside an acacia woodland.",
    description:
      "Sixteenth-century sandstone tombs, quiet colonnades, and forgotten stepwells hidden inside a sprawling wooded park.",
    detailed_description:
      "While crowds line up outside the Qutub Minar complex nearby, few wander just five hundred meters south into the Mehrauli Archaeological Park. Spread across two hundred acres of acacia forest are over a hundred historical monuments dating from the Khalji and Mughal eras.\n\nThe Jamali Kamali mosque features finely incised plasterwork and a ceiling painted in lapis lazuli and vermilion. Further down a dirt trail sits Rajon ki Baoli, a stepwell whose tiered arched galleries remain cool even in the heat of a Delhi June. Early morning is the best time, when peacocks call from the stone walls.",
    photo_url:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Sylwia Bartyzel",
    latitude: 28.5218,
    longitude: 77.1855,
    tags: ["Ruins", "Stepwell", "Quiet walk"],
    affiliate_url: null,
    status: "published",
    rating: 4.7,
    review_count: 27,
    quick_facts: {
      best_time: "October to March (early mornings from 7:00 am)",
      getting_there: "Qutab Minar metro station on Yellow Line, then short walk",
      ideal_for: "Architecture lovers, morning joggers, photographers",
      price_level: "Free entry",
    },
    reviews: [
      {
        id: "rev-10",
        place_id: "8",
        author_name: "Ananya Saxena",
        rating: 5,
        text: "One of the most peaceful walks in Delhi. Enter from the Mehrauli gate early on a Sunday morning before the city wakes up.",
        created_at: "2026-09-04",
      },
    ],
  },
  {
    id: "9",
    slug: "fontainhas-latin-quarter-goa",
    name: "Fontainhas Latin Quarter Alleys",
    city: "Goa",
    category: "See",
    mood: "Slow stays",
    teaser:
      "Cobblestone lanes of ochre and indigo where fresh poee bread arrives by bicycle at dawn.",
    description:
      "A peaceful heritage neighborhood in Panaji with ochre and indigo Portuguese villas, quiet bakeries, and azulejo tiles.",
    detailed_description:
      "Fontainhas lies nestled between Altinho hill and the Ourem creek in Panaji. Built in the late eighteenth century, the neighborhood retains narrow cobblestone lanes lined with Portuguese-style homes painted in vivid hues of pale yellow, terracotta, and indigo blue.\n\nEvery home has wrought iron balconies, oyster shell window panes, and decorative ceramic house number plates. Walk early in the morning when the local baker delivers fresh poee bread by bicycle, or stop by the tiny Confeitaria 31 de Janeiro for a warm bolo de noz (walnut cake) and espresso.",
    photo_url:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    ],
    photo_credit: "Unsplash / Annie Spratt",
    latitude: 15.4989,
    longitude: 73.8311,
    tags: ["Architecture", "Heritage walk", "Quiet"],
    affiliate_url: null,
    status: "published",
    rating: 4.8,
    review_count: 24,
    quick_facts: {
      best_time: "November to February; walking at 7:30 am",
      getting_there: "Walk from Panaji bus stand across the Ourem creek bridge",
      ideal_for: "Flâneurs, sketch artists, quiet couples",
      price_level: "Free to wander; ₹200 for bakery coffee",
    },
    reviews: [
      {
        id: "rev-11",
        place_id: "9",
        author_name: "Vivian D'Souza",
        rating: 5,
        text: "Wandering these lanes at 7 am is a completely different side of Goa that most tourists never see. Respect the residents' privacy while taking photos.",
        created_at: "2026-08-19",
      },
    ],
  },
];

// Helper to look up a place by slug
export function getPlaceBySlug(slug: string): Place | undefined {
  return seedPlaces.find((place) => place.slug === slug);
}

// Helper to get 3 related places for the "Keep wandering" section
export function getRelatedPlaces(currentSlug: string): Place[] {
  return seedPlaces
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);
}
