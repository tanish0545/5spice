export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  formattedPrice: string; // e.g. "₹395"
  category: string;
  isVeg: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0 = mild, 1 = medium, 2 = spicy, 3 = very spicy
  portion?: string;
  image: string;
  featured?: boolean;
  bestseller?: boolean;
}

export interface RestaurantInfo {
  name: string;
  branch: string;
  city: string;
  state: string;
  fullAddress: string;
  landmark: string;
  metroStation: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  timings: {
    lunch: string;
    dinner: string;
    days: string;
  };
  costForTwo: string;
  cuisines: string[];
  externalLinks: {
    zomato: string;
    swiggy: string;
    googleMaps: string;
  };
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: '5 Spice',
  branch: 'Sakinaka, Andheri East',
  city: 'Mumbai',
  state: 'Maharashtra',
  fullAddress: 'Ground Floor, Shivai Industrial Estate, Andheri-Kurla Road, Opposite Woodland Store (Next to McDonald\'s), Sakinaka, Andheri East, Mumbai - 400072',
  landmark: 'Opposite Woodland Store, Next to McDonald\'s',
  metroStation: 'Sakinaka Metro Station (Line 1, 250m walking distance)',
  phone: '+91 22 28562186',
  secondaryPhone: '+91 9768203721',
  email: 'sakinaka@5spice.in',
  timings: {
    lunch: '12:00 PM – 3:30 PM',
    dinner: '7:00 PM – 11:30 PM',
    days: 'Open All 7 Days',
  },
  costForTwo: '₹1,800 – ₹2,100 for two (approx.)',
  cuisines: ['Chinese', 'Sichuan', 'Thai', 'Fresh Seafood', 'Indo-Chinese', 'Signature Desserts'],
  externalLinks: {
    zomato: 'https://www.zomato.com/mumbai/5-spice-sakinaka',
    swiggy: 'https://www.swiggy.com/city/mumbai/5-spice-sakinaka-marol-sakinaka-rest3279',
    googleMaps: 'https://maps.google.com/?q=5+Spice+Sakinaka+Andheri+East+Mumbai',
  },
};

export const MENU_CATEGORIES = [
  'All',
  'Signatures & Starters',
  'Soups',
  'Seafood Specialties',
  'Rice & Pot Rice',
  'Noodles',
  'Main Course Gravies',
  'Thai Curries',
  'Legendary Desserts',
  'Beverages',
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // Signature & Veg Starters
  {
    id: 'fs-potato-chilli',
    name: 'Crispy Chilli Potatoes',
    subtitle: '5 Spice Cult Signature',
    description: 'Golden crispy shredded potato fingers wok-tossed with fresh scallions, crushed Sichuan red chillies, garlic, and sweet-spicy glaze. The legendary starter ordered at every table.',
    price: 395,
    formattedPrice: '₹395',
    category: 'Signatures & Starters',
    isVeg: true,
    spiceLevel: 2,
    portion: 'Generous sharing portion',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-kung-pao-potato',
    name: 'Kung Pao Potato',
    subtitle: 'Sichuan Peppercorn & Peanuts',
    description: 'Crispy fried potato cubes tossed with roasted peanuts, whole dried red chillies, bell peppers, and savoury tangy dark soy reduction.',
    price: 425,
    formattedPrice: '₹425',
    category: 'Signatures & Starters',
    isVeg: true,
    spiceLevel: 2,
    portion: 'Serves 2-3',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-paneer-chilli',
    name: 'Paneer Chilli Dry',
    subtitle: 'Classic Indo-Chinese',
    description: 'Tender cottage cheese cubes tossed in spicy green chilli soy gravy with crunchy diced capsicum and onions.',
    price: 445,
    formattedPrice: '₹445',
    category: 'Signatures & Starters',
    isVeg: true,
    spiceLevel: 2,
    portion: 'Serves 2',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-veg-spring-rolls',
    name: 'Shanghai Vegetable Spring Rolls',
    subtitle: 'Crisp Gold Wrappers',
    description: 'Crisp fried rolls packed with julienned cabbage, carrots, bell peppers, and glass noodles, served with sweet chilli dip.',
    price: 385,
    formattedPrice: '₹385',
    category: 'Signatures & Starters',
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },

  // Non-Veg Starters
  {
    id: 'fs-chicken-lollipop',
    name: 'Chicken Lollipop (Oil Fry / Schezwan)',
    subtitle: 'Mumbai Street-Style Classic',
    description: 'Marinated frenched chicken winglets deep-fried till crunchy, served with fiery house-made Schezwan dipping sauce.',
    price: 465,
    formattedPrice: '₹465',
    category: 'Signatures & Starters',
    isVeg: false,
    spiceLevel: 2,
    portion: '6 pcs generous cut',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    bestseller: true,
  },
  {
    id: 'fs-chicken-manchurian',
    name: 'Chicken Manchurian Dry',
    subtitle: 'Ginger Garlic Dark Soya',
    description: 'Bite-sized minced chicken morsels seared in fiery wok with minced ginger, garlic, green chillies, and dark soy glaze.',
    price: 445,
    formattedPrice: '₹445',
    category: 'Signatures & Starters',
    isVeg: false,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-schezwan-chicken',
    name: 'Schezwan Chicken Dry',
    subtitle: 'Wok-Tossed Heat',
    description: 'Sliced chicken breast flash-fried with crushed Sichuan peppercorns, dried red chillies, and aromatic ginger.',
    price: 455,
    formattedPrice: '₹455',
    category: 'Signatures & Starters',
    isVeg: false,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
  },

  // Seafood Specialties
  {
    id: 'fs-chilli-prawns',
    name: 'Chilli Prawns',
    subtitle: 'Coastal Fresh Catch',
    description: 'Succulent coastal prawns tossed with chopped garlic, dark soya, red peppers, and spring onions over smoking wok heat.',
    price: 545,
    formattedPrice: '₹545',
    category: 'Seafood Specialties',
    isVeg: false,
    spiceLevel: 2,
    portion: 'Serves 2-3',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-butter-garlic-prawns',
    name: 'Prawns in Butter Garlic Sauce',
    subtitle: 'Velvety Garlic Herb Glaze',
    description: 'Plump ocean prawns poached in generous butter, crushed roasted garlic, white pepper, and scallion curls.',
    price: 595,
    formattedPrice: '₹595',
    category: 'Seafood Specialties',
    isVeg: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
  },

  // Soups
  {
    id: 'fs-crab-soup',
    name: 'Crab Meat Soup',
    subtitle: 'Silky Rich Broth',
    description: 'Fragrant and comforting clear broth enriched with shredded crab meat, beaten egg ribbons, fresh spring onions, and white pepper.',
    price: 365,
    formattedPrice: '₹365',
    category: 'Soups',
    isVeg: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-five-spice-soup-chicken',
    name: '5 Spice Special Chicken Soup',
    subtitle: 'House Secret Recipe',
    description: 'Spicy and tangy hearty broth with shredded chicken, mushrooms, bamboo shoots, and our signature five-spice seasoning.',
    price: 315,
    formattedPrice: '₹315',
    category: 'Soups',
    isVeg: false,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-manchow-soup-veg',
    name: 'Veg Manchow Soup',
    subtitle: 'With Crispy Fried Noodles',
    description: 'Thick dark soy soup infused with crushed garlic, green chillies, coriander stems, and crunchy golden fried noodles.',
    price: 245,
    formattedPrice: '₹245',
    category: 'Soups',
    isVeg: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
  },

  // Rice & Pot Rice (Famous Mumbai Speciality)
  {
    id: 'fs-chicken-pot-rice',
    name: '5 Spice Special Chicken Pot Rice',
    subtitle: 'Signature Clay-Pot Style Feasting',
    description: 'Steamed fragrant jasmine rice topped with a luscious, aromatic gravy of sliced chicken, shiitake mushrooms, baby corn, pak choi, and bamboo shoots in clay-pot style.',
    price: 695,
    formattedPrice: '₹695',
    category: 'Rice & Pot Rice',
    isVeg: false,
    spiceLevel: 1,
    portion: 'Generous 1000ml pot / Serves 2-3',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-veg-pot-rice',
    name: '5 Spice Special Veg Pot Rice',
    subtitle: 'Clay-Pot Steamed Feast',
    description: 'Steamed rice covered in thick vegetable stew of button mushrooms, water chestnuts, broccoli, and exotic Asian greens.',
    price: 645,
    formattedPrice: '₹645',
    category: 'Rice & Pot Rice',
    isVeg: true,
    spiceLevel: 1,
    portion: 'Generous 1000ml pot / Serves 2-3',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-burnt-garlic-rice-chicken',
    name: 'Burnt Garlic Fried Rice (Chicken)',
    subtitle: 'Wok-Smoked Aromatics',
    description: 'Long-grain basmati wok-tossed over high flame with deeply browned golden garlic, tender chicken shreds, and scallions.',
    price: 435,
    formattedPrice: '₹435',
    category: 'Rice & Pot Rice',
    isVeg: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-schezwan-triple-rice',
    name: 'Schezwan Triple Fried Rice with Gravy',
    subtitle: 'Mumbai Ultimate Indulgence',
    description: 'A combination of Schezwan rice, fried noodles, and a rich spicy bowl of Schezwan chicken gravy topped with fried egg.',
    price: 545,
    formattedPrice: '₹545',
    category: 'Rice & Pot Rice',
    isVeg: false,
    spiceLevel: 3,
    portion: 'Heavy portion / Serves 2-3',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },

  // Noodles
  {
    id: 'fs-malaysian-noodles',
    name: 'Malaysian Chicken Noodles',
    subtitle: 'Yellow Curry & Coconut Wok',
    description: 'Flat egg noodles wok-seared with tender chicken, yellow curry paste, bell peppers, coconut milk aroma, and crispy fried onions.',
    price: 485,
    formattedPrice: '₹485',
    category: 'Noodles',
    isVeg: false,
    spiceLevel: 2,
    portion: 'Generous bowl / Serves 2',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-hakka-noodles-veg',
    name: 'Veg Hakka Noodles',
    subtitle: 'The Mumbai Favourite',
    description: 'Classic wok-tossed thin noodles with crunchy shredded cabbage, julienne carrots, capsicum, and light soy seasoning.',
    price: 365,
    formattedPrice: '₹365',
    category: 'Noodles',
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
  },

  // Main Course Gravies
  {
    id: 'fs-chicken-hot-garlic',
    name: 'Chicken in Hot Garlic Sauce',
    subtitle: 'Fiery Garlic Gravy',
    description: 'Sliced chicken simmered in a robust red chilli and crushed garlic sauce with diced onions and capsicum.',
    price: 485,
    formattedPrice: '₹485',
    category: 'Main Course Gravies',
    isVeg: false,
    spiceLevel: 3,
    portion: 'Serves 2',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-paneer-black-bean',
    name: 'Paneer in Black Bean Sauce',
    subtitle: 'Rich Fermented Umami',
    description: 'Paneer batons tossed in savory Chinese fermented black bean reduction with ginger, garlic, and spring onions.',
    price: 445,
    formattedPrice: '₹445',
    category: 'Main Course Gravies',
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  },

  // Thai Curries
  {
    id: 'fs-thai-green-curry',
    name: 'Thai Green Curry with Steamed Rice',
    subtitle: 'Lemongrass, Galangal & Coconut Milk',
    description: 'Authentic Thai green paste simmered with coconut milk, pea aubergines, kaffir lime leaves, and bamboo shoots. Served with steamed jasmine rice.',
    price: 565,
    formattedPrice: '₹565',
    category: 'Thai Curries',
    isVeg: true,
    spiceLevel: 2,
    portion: 'Curry + Steamed Rice combo',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
  },

  // Legendary 5 Spice Desserts
  {
    id: 'fs-rocky-road',
    name: 'Rocky Road',
    subtitle: 'The Legendary 5 Spice Cult Dessert',
    description: 'A towering sundae bowl loaded with vanilla and Belgian chocolate ice cream, warm gooey chocolate fudge sauce, toasted almonds, crunchy cashews, soft marshmallows, and chewy walnut brownie chunks.',
    price: 395,
    formattedPrice: '₹395',
    category: 'Legendary Desserts',
    isVeg: true,
    portion: 'Signature XXL / Easily serves 2-3',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-death-by-chocolate',
    name: 'Death by Chocolate',
    subtitle: 'Rich Dutch Cocoa Decadence',
    description: 'Multiple dense layers of dark Dutch chocolate truffle sponge, silky chocolate mousse, dark fudge ganache, and dark chocolate curls.',
    price: 345,
    formattedPrice: '₹345',
    category: 'Legendary Desserts',
    isVeg: true,
    portion: 'Per Slice (500g Cake ₹1,200)',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
  },
  {
    id: 'fs-mission-impossible',
    name: 'Mission Impossible',
    subtitle: '7-Layer Dessert Extravaganza',
    description: 'Seven layers of molten chocolate mud cake, butterscotch caramel drip, roasted walnut brownies, and triple scoops of vanilla, chocolate, and mocha ice cream.',
    price: 495,
    formattedPrice: '₹495',
    category: 'Legendary Desserts',
    isVeg: true,
    portion: 'Colossal celebration bowl / Serves 3-4',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  },

  // Beverages
  {
    id: 'fs-lime-soda',
    name: 'Fresh Lime Soda (Sweet / Salt)',
    subtitle: 'Refreshing Cleanser',
    description: 'Freshly squeezed Indian key limes with bubbly chilled club soda. Perfect companion to spicy Sichuan dishes.',
    price: 145,
    formattedPrice: '₹145',
    category: 'Beverages',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fs-iced-peach-tea',
    name: 'Iced Lemon Peach Tea',
    subtitle: 'Slow-Brewed Botanicals',
    description: 'Chilled Ceylon black tea steeped with natural peach nectar, mint leaves, and a squeeze of fresh lemon.',
    price: 195,
    formattedPrice: '₹195',
    category: 'Beverages',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80',
  },
];

