import {
  db,
  blogPostsTable,
  portfolioProjectsTable,
  servicesTable,
  testimonialsTable,
  faqsTable,
  contactMessagesTable,
  newsletterSubscribersTable,
  appointmentsTable,
} from "@workspace/db";

const IMG = "/images/seed";

async function seed() {
  console.log("Seeding services...");
  await db.insert(servicesTable).values([
    {
      slug: "summit-trek",
      name: "Guided Summit Treks",
      description:
        "Multi-day guided ascents of iconic Rocky Mountain peaks, led by certified alpine guides with full technical support, camp logistics, and safety planning.",
      icon: "mountain",
      priceFrom: 895,
      duration: "3-5 days",
      features: [
        "Certified IFMGA-trained guides",
        "All technical gear provided",
        "Camp meals and permits included",
        "Small groups, max 6 climbers",
      ],
    },
    {
      slug: "rock-climbing",
      name: "Rock Climbing Expeditions",
      description:
        "Half-day to multi-day rock climbing trips for all skill levels, from first-time top-rope climbers to experienced trad leaders tackling exposed granite routes.",
      icon: "mountain-snow",
      priceFrom: 245,
      duration: "4 hours - 3 days",
      features: [
        "Beginner to advanced routes",
        "Personal climbing gear included",
        "1:2 guide-to-climber ratio",
        "Photography package available",
      ],
    },
    {
      slug: "whitewater-kayaking",
      name: "Whitewater Kayaking",
      description:
        "Adrenaline-charged kayaking trips down Class II-IV rapids with expert river guides, full safety briefings, and all paddling equipment supplied.",
      icon: "waves",
      priceFrom: 189,
      duration: "1-2 days",
      features: [
        "Class II-IV river routes",
        "Dry suits and safety gear included",
        "Certified swiftwater rescue guides",
        "Hot lunch on multi-day trips",
      ],
    },
    {
      slug: "backcountry-skiing",
      name: "Backcountry Ski Touring",
      description:
        "Untracked powder in remote alpine bowls, guided by avalanche-certified professionals with full backcountry safety equipment and instruction.",
      icon: "snowflake",
      priceFrom: 320,
      duration: "1-4 days",
      features: [
        "AIARE-certified guides",
        "Avalanche safety gear provided",
        "Hut-to-hut options available",
        "Small group sizes for safety",
      ],
    },
    {
      slug: "wilderness-camping",
      name: "Wilderness Basecamp Trips",
      description:
        "Fully outfitted basecamp experiences deep in the backcountry — a relaxed way to disconnect, with guided day hikes, campfire dinners, and stargazing.",
      icon: "tent",
      priceFrom: 410,
      duration: "2-4 days",
      features: [
        "Fully equipped camp kitchen",
        "Guided day hikes included",
        "Family-friendly itineraries",
        "Leave No Trace certified crew",
      ],
    },
    {
      slug: "alpine-trekking",
      name: "Alpine Ridge Trekking",
      description:
        "Scenic multi-day treks across high alpine ridgelines and valleys, balancing challenge and breathtaking views without technical climbing.",
      icon: "map",
      priceFrom: 560,
      duration: "3-6 days",
      features: [
        "Panoramic ridge and valley routes",
        "Moderate fitness level required",
        "Lodge or tent camping options",
        "Custom itineraries available",
      ],
    },
  ]);

  console.log("Seeding portfolio projects...");
  await db.insert(portfolioProjectsTable).values([
    {
      title: "Torreys Peak Summit Expedition",
      category: "Summit Trek",
      description:
        "A 4-day guided ascent of Torreys Peak with a group of 6 first-time 14er climbers, culminating in a sunrise summit push above 14,000 feet.",
      imageUrl: `${IMG}/portfolio-summit-trek.png`,
      location: "Front Range, Colorado",
      clientName: "Denver Adventure Collective",
      completedAt: new Date("2025-08-12"),
    },
    {
      title: "Eldorado Canyon Trad Climb",
      category: "Rock Climbing",
      description:
        "A two-day intensive for four climbers progressing from top-rope to leading multi-pitch trad routes on Eldorado Canyon's iconic granite walls.",
      imageUrl: `${IMG}/portfolio-rock-climbing.png`,
      location: "Eldorado Canyon, Colorado",
      clientName: "Boulder Climbing Co-op",
      completedAt: new Date("2025-06-03"),
    },
    {
      title: "Arkansas River Rapids Run",
      category: "Whitewater Kayaking",
      description:
        "A high-water Class IV descent of the Numbers section with a corporate team-building group, including full safety and rescue training.",
      imageUrl: `${IMG}/portfolio-kayak-rapids.png`,
      location: "Arkansas River, Colorado",
      clientName: "Peak Fintech Retreat",
      completedAt: new Date("2025-05-21"),
    },
    {
      title: "San Juan Backcountry Powder Tour",
      category: "Backcountry Skiing",
      description:
        "A 3-day hut-to-hut backcountry ski tour through untouched San Juan Mountain bowls for an experienced group of six skiers.",
      imageUrl: `${IMG}/portfolio-backcountry-ski.png`,
      location: "San Juan Mountains, Colorado",
      clientName: "Telluride Ski Alliance",
      completedAt: new Date("2025-02-14"),
    },
    {
      title: "Maroon Bells Wilderness Basecamp",
      category: "Wilderness Camping",
      description:
        "A relaxed 4-day family basecamp trip beneath the Maroon Bells, with guided day hikes, campfire cooking, and stargazing sessions.",
      imageUrl: `${IMG}/portfolio-wilderness-camp.png`,
      location: "Maroon Bells, Colorado",
      clientName: "The Whitfield Family",
      completedAt: new Date("2025-09-02"),
    },
    {
      title: "Continental Divide Ridge Trek",
      category: "Alpine Trekking",
      description:
        "A 5-day traverse of a remote section of the Continental Divide Trail, showcasing sweeping alpine views for a group of experienced trekkers.",
      imageUrl: `${IMG}/portfolio-alpine-trek.png`,
      location: "Continental Divide, Colorado",
      clientName: "Trailhead Media Productions",
      completedAt: new Date("2025-07-28"),
    },
  ]);

  console.log("Seeding testimonials...");
  await db.insert(testimonialsTable).values([
    {
      customerName: "Emily Carter",
      role: "Summit Trek Guest",
      quote:
        "Our guide knew every inch of that mountain and made us feel safe the entire climb. Watching the sunrise from the summit is something I'll never forget.",
      rating: 5,
      imageUrl: `${IMG}/testimonial-1.png`,
    },
    {
      customerName: "Marcus Webb",
      role: "Rock Climbing Client",
      quote:
        "I went from nervous beginner to leading my first pitch in two days. The patience and expertise of the Summit Outdoor team is unmatched.",
      rating: 5,
      imageUrl: `${IMG}/testimonial-2.png`,
    },
    {
      customerName: "Linda Ferreira",
      role: "Wilderness Basecamp Guest",
      quote:
        "This was the perfect way to introduce my grandkids to the backcountry. Comfortable camp, incredible food, and guides who genuinely love what they do.",
      rating: 5,
      imageUrl: `${IMG}/testimonial-3.png`,
    },
  ]);

  console.log("Seeding FAQs...");
  await db.insert(faqsTable).values([
    {
      question: "Do I need prior experience to book a trip?",
      answer:
        "It depends on the trip. Our wilderness basecamp and alpine trekking trips are open to most fitness levels, while summit treks and technical climbs may require prior experience. Each trip page lists a fitness and skill rating, and our team is happy to help you choose the right fit.",
      category: "Booking",
    },
    {
      question: "What gear is provided versus what should I bring?",
      answer:
        "All technical and safety gear — ropes, harnesses, avalanche equipment, kayaks, and dry suits — is provided. You'll need personal clothing layers, footwear, and a sleeping bag for multi-day trips. We send a detailed packing list after booking.",
      category: "Preparation",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Full refunds are available up to 30 days before your trip date. Cancellations within 30 days receive a 50% credit toward a future trip. We recommend travel insurance for last-minute changes.",
      category: "Booking",
    },
    {
      question: "How many people are in each guided group?",
      answer:
        "Most trips cap at 6 guests per guide to maintain safety and a personal experience. Private and custom group trips are available on request.",
      category: "Trips",
    },
    {
      question: "Are your guides certified?",
      answer:
        "Yes. All lead guides hold relevant certifications including AMGA, IFMGA, AIARE avalanche training, and swiftwater rescue certification depending on the activity.",
      category: "Safety",
    },
    {
      question: "Can I book a custom or private trip?",
      answer:
        "Absolutely. Many of our best trips started as custom requests. Reach out through the contact form or booking page with your group size, dates, and goals, and we'll build an itinerary around it.",
      category: "Booking",
    },
    {
      question: "What happens in bad weather?",
      answer:
        "Guest safety always comes first. Guides monitor conditions continuously and will adjust routes, delay starts, or reschedule when necessary. We'll always communicate changes as early as possible.",
      category: "Safety",
    },
  ]);

  console.log("Seeding blog posts...");
  await db.insert(blogPostsTable).values([
    {
      slug: "essential-gear-guide-first-summit",
      title: "The Essential Gear Guide for Your First Summit Trek",
      excerpt:
        "Heading out on your first guided summit trek? Here's exactly what to pack, what we provide, and the mistakes most first-timers make.",
      content:
        "Preparing for your first summit trek can feel overwhelming, but it doesn't need to be. Start with your layering system: a moisture-wicking base layer, an insulating mid layer, and a waterproof, windproof shell. Cotton has no place above treeline — it holds moisture and can quickly lead to hypothermia.\n\nFootwear matters more than almost anything else. A broken-in pair of sturdy hiking boots with ankle support will save you from blisters and rolled ankles on scree fields. Bring two pairs of wool socks and rotate them if a multi-day trip involves stream crossings.\n\nOur guides provide all technical gear — ropes, harnesses, and helmets where routes call for them — so you don't need to invest in expensive equipment before your first trip. What you should bring: a 30-40L daypack, trekking poles, a headlamp with spare batteries, sun protection, and at least 2 liters of water capacity.\n\nFinally, pack your patience and your appetite for early mornings. Most summit pushes start before dawn to avoid afternoon thunderstorms and to catch the mountain in its calmest, safest hours. Trust your guide's pacing — altitude affects everyone differently, and a steady pace beats a fast one every time.",
      category: "Gear",
      author: "Jesse Alvarado",
      imageUrl: `${IMG}/blog-gear-guide.png`,
      readTimeMinutes: 6,
      publishedAt: new Date("2025-09-18"),
    },
    {
      slug: "five-best-colorado-alpine-trails",
      title: "5 of the Best Alpine Trails in Colorado You Haven't Tried Yet",
      excerpt:
        "Skip the crowded 14ers — these five alpine routes deliver just as much beauty with a fraction of the foot traffic.",
      content:
        "Colorado's famous 14ers get all the attention, but some of the most rewarding alpine trails in the state see a fraction of the traffic. Here are five routes our guides return to again and again.\n\n1. Ice Lakes Basin — A turquoise alpine lake framed by jagged peaks, reached via a moderate 7-mile round trip through wildflower meadows.\n\n2. Willow Lakes Loop — A lesser-known Gore Range gem with dramatic granite spires and pristine alpine lakes, best done as an overnight.\n\n3. American Basin — One of the most wildflower-dense basins in the state come July, with optional scrambles up nearby thirteeners.\n\n4. Chicago Basin — A remote basin accessible only by rail and trail, home to three 14ers and resident mountain goats that will happily photobomb your summit shots.\n\n5. Blue Lakes Trail near Ridgway — A shorter but jaw-dropping route to a series of glacial lakes beneath the Sneffels Range.\n\nEach of these can be built into a custom alpine trekking itinerary with our guides, complete with camp logistics and route-finding support.",
      category: "Trail Guides",
      author: "Priya Nakamura",
      imageUrl: `${IMG}/blog-best-trails.png`,
      readTimeMinutes: 8,
      publishedAt: new Date("2025-08-05"),
    },
    {
      slug: "backcountry-safety-fundamentals",
      title: "Backcountry Safety Fundamentals Every Adventurer Should Know",
      excerpt:
        "From weather reading to avalanche awareness, these are the safety fundamentals our guides drill into every trip briefing.",
      content:
        "Every trip we run starts with the same message: the mountain doesn't care about your itinerary. Respecting that is the foundation of backcountry safety.\n\nWeather awareness comes first. Afternoon thunderstorms are a daily risk above treeline in summer, which is why we start summit pushes before dawn. Learn to read building cumulus clouds and always have a turnaround time you commit to regardless of how close you are to a goal.\n\nFor winter backcountry travel, avalanche awareness is non-negotiable. Every guest on a backcountry skiing trip receives a safety briefing and carries a beacon, probe, and shovel. Understanding slope angle, recent snowfall, and wind loading can be the difference between a great powder day and a dangerous one.\n\nNavigation skills matter even with a guide present. Carry a physical map and compass as backup to any GPS device — batteries die, and phones lose signal fast in canyon terrain.\n\nFinally, tell someone your plan. Whether or not you're on a guided trip, always leave a detailed itinerary with someone at home, including expected return time and emergency contacts.",
      category: "Safety",
      author: "Dana Whitfield",
      imageUrl: `${IMG}/blog-safety-tips.png`,
      readTimeMinutes: 7,
      publishedAt: new Date("2025-07-11"),
    },
    {
      slug: "family-friendly-outdoor-adventures",
      title: "Planning a Family-Friendly Outdoor Adventure That Everyone Will Love",
      excerpt:
        "Bringing kids or grandparents into the backcountry doesn't mean sacrificing adventure. Here's how we design trips for every age.",
      content:
        "The best family trips balance genuine adventure with realistic expectations. Our wilderness basecamp trips are designed exactly for this — a comfortable, fully-outfitted camp as a home base, paired with day hikes that scale to the group's ability.\n\nStart with honest conversations about fitness and interest levels. A basecamp model works well because not everyone has to do every activity every day; some family members might join a moderate day hike while others fish or relax at camp.\n\nInvolve kids in the planning. Letting them pick a hike from a shortlist, choose camp meals, or pack their own daypack builds excitement and ownership over the trip.\n\nPack for comfort, not just performance. A warm sleeping bag rated below expected nighttime lows, a favorite snack, and a lightweight camp chair go a long way toward a positive experience for younger or older travelers.\n\nOur guides are experienced at reading group energy and adjusting plans in real time — because the goal isn't to summit something, it's for everyone to come home wanting to do it again.",
      category: "Family Travel",
      author: "Jesse Alvarado",
      imageUrl: `${IMG}/blog-family-adventures.png`,
      readTimeMinutes: 5,
      publishedAt: new Date("2025-06-22"),
    },
  ]);

  console.log("Seeding contact messages...");
  await db.insert(contactMessagesTable).values([
    {
      name: "Rachel Kim",
      email: "rachel.kim@example.com",
      subject: "Custom trip for a bachelorette group",
      message:
        "Hi! I'm looking to plan a 3-day trip for 8 women in early September, ideally a mix of hiking and a relaxed evening at camp. What would you recommend?",
    },
    {
      name: "Tom Whitfield",
      email: "tom.whitfield@example.com",
      subject: "Question about avalanche certification on the ski tour",
      message:
        "Do all guides on the backcountry ski tours carry AIARE Level 2 certification, or just Level 1? Wanted to confirm before booking for our group.",
    },
    {
      name: "Sara Delgado",
      email: "sara.delgado@example.com",
      subject: "Gear rental availability",
      message:
        "I don't own a dry suit or kayaking gear yet — is rental included in the whitewater kayaking price, or is that an add-on?",
    },
  ]);

  console.log("Seeding newsletter subscribers...");
  await db.insert(newsletterSubscribersTable).values([
    { email: "adventurer.mike@example.com" },
    { email: "hikergirl22@example.com" },
    { email: "outdoors.family@example.com" },
    { email: "trailblazer.dana@example.com" },
  ]);

  console.log("Seeding appointments...");
  await db.insert(appointmentsTable).values([
    {
      name: "Chris Anderson",
      email: "chris.anderson@example.com",
      phone: "555-201-3344",
      serviceName: "Guided Summit Treks",
      preferredDate: "2026-08-15",
      preferredTime: "05:00 AM",
      notes: "Group of 4, all with prior 14er experience.",
      status: "confirmed",
    },
    {
      name: "Maya Torres",
      email: "maya.torres@example.com",
      phone: "555-882-7710",
      serviceName: "Rock Climbing Expeditions",
      preferredDate: "2026-07-22",
      preferredTime: "08:00 AM",
      notes: "First-time climbers, would like a beginner-friendly route.",
      status: "pending",
    },
    {
      name: "Devon Blake",
      email: "devon.blake@example.com",
      phone: "555-410-9982",
      serviceName: "Whitewater Kayaking",
      preferredDate: "2026-06-10",
      preferredTime: "09:30 AM",
      notes: null,
      status: "pending",
    },
    {
      name: "Grace Lin",
      email: "grace.lin@example.com",
      phone: "555-673-2201",
      serviceName: "Wilderness Basecamp Trips",
      preferredDate: "2026-08-02",
      preferredTime: "10:00 AM",
      notes: "Family of 5 including two children ages 8 and 11.",
      status: "confirmed",
    },
    {
      name: "Ian Walsh",
      email: "ian.walsh@example.com",
      phone: "555-556-8830",
      serviceName: "Backcountry Ski Touring",
      preferredDate: "2026-02-14",
      preferredTime: "07:00 AM",
      notes: "Interested in hut-to-hut option if available.",
      status: "cancelled",
    },
  ]);

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
