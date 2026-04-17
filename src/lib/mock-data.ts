export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
  featured: boolean;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  language?: string;
  pin?: string;
  isMember: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Luxe Ivory Crochet Crop Top",
    description: "A masterpiece of artisanal craftsmanship, this handcrafted ivory crop top features intricate open-weave patterns. Each stitch is meticulously worked for a refined, breathable finish. A true limited edition piece for the discerning collector.",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
    category: "crochet",
    stock: 8,
    featured: true,
  },
  {
    id: 2,
    name: "Gold-Trimmed Statement Cardigan",
    description: "Elevate your evening silhouette with this oversized statement cardigan, interwoven with subtle metallic gold threads. This piece offers a draped, luxurious fit that defines effortless handmade elegance.",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1618333234976-47409244036f?q=80&w=1961&auto=format&fit=crop",
    category: "crochet",
    stock: 5,
    featured: true,
  },
  {
    id: 3,
    name: "Artisanal Halter Mini Dress",
    description: "Sophistication meets summer romance in this elegant cream halter mini dress. Hand-crocheted to order, its unique texture and refined silhouette make it a standout choice for sunset soirées.",
    price: 110.00,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    category: "crochet",
    stock: 4,
    featured: false,
  },
  {
    id: 4,
    name: "Signature Hand-Beaded Clutch",
    description: "Intricately hand-beaded with thousands of black and gold crystals, this signature evening bag is a true work of art. Featuring a secure magnetic closure and a luxurious silk lining.",
    price: 85.00,
    imageUrl: "https://images.unsplash.com/photo-1549439602-43ebcb2328af?q=80&w=2070&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 6,
    featured: true,
  },
  {
    id: 5,
    name: "Pearl-Adorned Luxury Shoulder Bag",
    description: "Timeless sophistication. This structured shoulder bag is meticulously adorned with hand-placed pearls and crystals over a premium black resin base. Includes an adjustable gold-link chain.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?q=80&w=2071&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 3,
    featured: true,
  },
  {
    id: 6,
    name: "Midnight Gold Mini Crossbody",
    description: "Compact and captivating. This mini crossbody features dense artisanal embroidery in midnight black and sun-soaked gold. A statement accessory for your most important events.",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 7,
    featured: false,
  },
  {
    id: 7,
    name: "Heritage Cotton Bucket Hat",
    description: "Fine-stitch ivory cotton crochet bucket hat, offering both sun protection and effortless luxury. A versatile piece that transitions seamlessly from beach to city.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1521316730702-829ad3878982?q=80&w=2070&auto=format&fit=crop",
    category: "crochet",
    stock: 10,
    featured: false,
  },
  {
    id: 8,
    name: "Exquisite Bridal Beaded Clutch",
    description: "Designed for a once-in-a-lifetime moment. This bridal clutch features delicate white glass beads and gold-thread accents. Custom-crafted for elegance that lasts forever.",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 2,
    featured: false,
  },
  {
    id: 9,
    name: "Teal & White Crochet Set",
    description: "Luxurious handcrafted teal crochet halter top with matching scalloped white shorts. Each piece is meticulously worked for a premium, artistic finish. Designed for beachside elegance and sunset moments.",
    price: 125.00,
    imageUrl: "/images/Product1.jpeg",
    category: "crochet",
    stock: 5,
    featured: true,
  },
  {
    id: 10,
    name: "Cerulean Dream Halter",
    description: "A breathtaking cerulean blue halter top, hand-crocheted with premium Egyptian cotton. Featuring a delicate scallop hem and an open-back design for ultimate coastal elegance.",
    price: 70.00,
    imageUrl: "https://images.unsplash.com/photo-1583844643592-356c4293297a?q=80&w=1974&auto=format&fit=crop",
    category: "crochet",
    stock: 6,
    featured: false,
  },
  {
    id: 11,
    name: "Noir Crystal Mini Pouch",
    description: "Maximum sparkle in a miniature form. This hand-beaded pouch features over 5,000 jet-black glass beads and a silver-wrapped handle. The perfect companion for gala evenings.",
    price: 90.00,
    imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 4,
    featured: true,
  },
  {
    id: 12,
    name: "Rose Quartz Artisan Set",
    description: "Soft rose-toned crochet crop top with matching high-waisted briefs. Intricately worked floral motifs add a romantic, bohemian touch to this luxury beachwear set.",
    price: 135.00,
    imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop",
    category: "crochet",
    stock: 3,
    featured: false,
  },
  {
    id: 13,
    name: "Emerald Mosaic Tote",
    description: "A masterpiece of structure and shine. This medium-sized tote is hand-beaded with deep emerald green and gold mosaic patterns. Features a rigid frame and lush velvet interior.",
    price: 180.00,
    imageUrl: "https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?q=80&w=1974&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 2,
    featured: false,
  },
  {
    id: 14,
    name: "Gilded Sand Beach Coverup",
    description: "An ethereal floor-length crochet coverup in shimmering champagne gold. Hand-knotted with metallic-blend yarn to catch every ray of the summer sun.",
    price: 160.00,
    imageUrl: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=2070&auto=format&fit=crop",
    category: "crochet",
    stock: 5,
    featured: true,
  },
  {
    id: 15,
    name: "Iridescent Sunset Clutch",
    description: "Capturing the magic of dusk. This structured clutch is adorned with holographic and mother-of-pearl beads that shift color with every movement.",
    price: 110.00,
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1972&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 8,
    featured: false,
  },
  {
    id: 16,
    name: "Aegean Scallop Kimono",
    description: "A luxurious oversized crochet kimono with exaggerated fringe and scalloped edging. Handcrafted in a deep indigo blue hue inspired by the Aegean Sea.",
    price: 145.00,
    imageUrl: "https://images.unsplash.com/photo-1565084993811-578f192b0051?q=80&w=1935&auto=format&fit=crop",
    category: "crochet",
    stock: 4,
    featured: false,
  },
  {
    id: 17,
    name: "Golden Hour Envelope Bag",
    description: "Slim, elegant, and timeless. This gold-beaded envelope bag features a geometric pattern inspired by mid-century architecture. Includes a detachable satin strap.",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df96467383?q=80&w=1974&auto=format&fit=crop",
    category: "beaded-bag",
    stock: 7,
    featured: false,
  },
];

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system' | 'exclusive';
  date: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Gilded Circle Exclusive",
    message: "You have been granted early access to the Summer Solstice Crochet Collection. Discover our latest hand-stitched masterpieces before they go public.",
    type: "exclusive",
    date: "2 hours ago",
    read: false
  },
  {
    id: 2,
    title: "Artisanal Order Crafted",
    message: "Great news! Your Gilded Sand Beach Coverup has been meticulously finished by our artisans and is now prepared for a secure shipment.",
    type: "order",
    date: "1 day ago",
    read: true
  },
  {
    id: 3,
    title: "Heritage Collection",
    message: "Learn about the ancient Mediterranean techniques used in our new Teal & White set. Our 'Artisan Journey' has been updated with new stories.",
    type: "promotion",
    date: "3 days ago",
    read: true
  }
];

export function getNotifications() {
  return mockNotifications;
}

export function getProducts() {
  return mockProducts;
}

export function getProductById(id: number) {
  return mockProducts.find(p => p.id === id);
}

export function getFeaturedProducts() {
  return mockProducts.filter(p => p.featured);
}
