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
    name: "Luxe Crochet Crop Top",
    description: "Handcrafted open-weave crochet crop top in ivory. Each stitch is individually worked for a refined, breathable finish. Limited edition.",
    price: 65.00,
    imageUrl: null,
    category: "crochet",
    stock: 8,
    featured: true,
  },
  {
    id: 2,
    name: "Gold-Trim Crochet Cardigan",
    description: "Statement oversized crochet cardigan with gold-thread accents. Draped silhouette, one-size-fits-most, exclusively handmade.",
    price: 95.00,
    imageUrl: null,
    category: "crochet",
    stock: 5,
    featured: true,
  },
  {
    id: 3,
    name: "Crochet Halter Dress",
    description: "Elegant halter neck crochet mini dress in cream. Perfect for evening occasions. Each piece is unique and handmade to order.",
    price: 110.00,
    imageUrl: null,
    category: "crochet",
    stock: 4,
    featured: false,
  },
  {
    id: 4,
    name: "Signature Beaded Evening Bag",
    description: "Luxurious hand-beaded evening clutch in black and gold. Features intricate beadwork with a secure magnetic clasp. A true collector's piece.",
    price: 85.00,
    imageUrl: null,
    category: "beaded-bag",
    stock: 6,
    featured: true,
  },
  {
    id: 5,
    name: "Pearl Beaded Shoulder Bag",
    description: "Sophisticated shoulder bag adorned with pearl and crystal beads on a structured black base. Adjustable chain strap included.",
    price: 120.00,
    imageUrl: null,
    category: "beaded-bag",
    stock: 3,
    featured: true,
  },
  {
    id: 6,
    name: "Mini Beaded Crossbody",
    description: "Compact crossbody bag with dense gold and black bead embroidery. Lined interior with zip pocket. A statement accessory.",
    price: 75.00,
    imageUrl: null,
    category: "beaded-bag",
    stock: 7,
    featured: false,
  },
  {
    id: 7,
    name: "Crochet Bucket Hat",
    description: "Hand-crocheted bucket hat in ivory cotton. Finely crafted for sun protection with effortless luxury style.",
    price: 45.00,
    imageUrl: null,
    category: "crochet",
    stock: 10,
    featured: false,
  },
  {
    id: 8,
    name: "Beaded Bridal Clutch",
    description: "Exquisite bridal clutch with white and gold beadwork. Custom made — allow 7-10 days for crafting. The perfect wedding accessory.",
    price: 150.00,
    imageUrl: null,
    category: "beaded-bag",
    stock: 2,
    featured: false,
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
