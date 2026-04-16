import { getProducts } from "@/lib/mock-data";
import { formatPrice, getImagePath } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, MessageSquare } from "lucide-react";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category");

  const allProducts = getProducts();
  const products = categoryParam 
    ? allProducts.filter(p => p.category === categoryParam)
    : allProducts;
  const isLoading = false;
  
  const { addToCart } = useCartWrapper();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load wishlist from local storage
  useEffect(() => {
    const saved = localStorage.getItem("gifora_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const toggleWishlist = (id: number) => {
    const newWishlist = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];
    setWishlist(newWishlist);
    localStorage.setItem("gifora_wishlist", JSON.stringify(newWishlist));
    
    if (!wishlist.includes(id)) {
      toast({
        title: "Added to Wishlist",
        description: "This piece has been reserved in your favorites.",
        className: "bg-primary text-primary-foreground"
      });
    }
  };

  const handleQuickAdd = (product: any) => {
    addToCart(product.id, 1);
    toast({
      title: "Bag Updated",
      description: `${product.name} has been added to your shopping bag.`,
      className: "bg-primary text-primary-foreground font-display tracking-widest text-xs"
    });
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8 gap-6">
        <div>
          <h1 className="font-display text-4xl tracking-[0.15em] mb-4">
            {categoryParam ? categoryParam.replace('-', ' ').toUpperCase() : 'THE COLLECTION'}
          </h1>
          <p className="text-muted-foreground tracking-wide font-light">Explore our handcrafted luxury pieces.</p>
        </div>
        
        <div className="flex gap-6 text-sm tracking-widest uppercase">
          <Link 
            href="/collection" 
            className={`hover:text-primary transition-colors ${!categoryParam ? 'text-primary' : 'text-muted-foreground'}`}
          >
            All
          </Link>
          <Link 
            href="/collection?category=crochet" 
            className={`hover:text-primary transition-colors ${categoryParam === 'crochet' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Crochet
          </Link>
          <Link 
            href="/collection?category=beaded-bag" 
            className={`hover:text-primary transition-colors ${categoryParam === 'beaded-bag' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Beaded Bags
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="aspect-[4/5] bg-card border border-border mb-6" />
              <div className="h-6 bg-card w-2/3 mx-auto mb-2" />
              <div className="h-4 bg-card w-1/3 mx-auto" />
            </div>
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-32 text-muted-foreground">
          <p className="text-xl font-display tracking-widest">No pieces found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {Array.isArray(products) && products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-card border border-border group-hover:border-primary/50 transition-colors duration-500">
                  {product.imageUrl ? (
                    <img 
                      src={getImagePath(product.imageUrl) || ""} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-display tracking-widest bg-secondary">
                      GIFORA
                    </div>
                  )}
                   {product.stock <= 0 && (
                    <div className="absolute top-4 right-4 bg-background/90 text-foreground px-3 py-1 text-xs tracking-widest border border-border">
                      SOLD OUT
                    </div>
                  )}

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-4 z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/20"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-white" : ""}`} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product); }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/20"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast({ title: "Comment Section", description: "Customer reviews arriving soon.", className: "bg-card text-foreground border-primary" }); }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg tracking-wider mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground tracking-widest">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
