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
];

export function getProducts() {
  return mockProducts;
}

export function getProductById(id: number) {
  return mockProducts.find(p => p.id === id);
}

export function getFeaturedProducts() {
  return mockProducts.filter(p => p.featured);
}
