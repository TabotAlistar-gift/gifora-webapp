import { useState, useEffect } from "react";
import { Link } from "wouter";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/lib/mock-data";
import { formatPrice, formatXAF, getImagePath } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useToast } from "@/hooks/use-toast";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCartWrapper();
  const { toast } = useToast();

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const saved = localStorage.getItem("gifora_wishlist");
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          const allProducts = await fetchProducts();
          const filtered = allProducts.filter(p => ids.includes(p.id));
          setWishlistItems(filtered);
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWishlist();
  }, []);

  const removeFromWishlist = (id: number) => {
    const newItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(newItems);
    localStorage.setItem("gifora_wishlist", JSON.stringify(newItems.map(item => item.id)));
    toast({
      title: "Removed",
      description: "Item removed from your wishlist.",
      variant: "destructive"
    });
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "Bag Updated",
      description: `${product.name} has been added to your shopping bag.`,
      className: "bg-primary text-primary-foreground font-display tracking-widest text-xs"
    });
  };

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container pt-32 pb-24 text-center min-h-screen">
        <h1 className="text-2xl font-display tracking-widest mb-4 uppercase">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted-foreground text-sm tracking-widest uppercase font-light mb-8">
          Explore our collection and find your next artisanal piece.
        </p>
        <Link href="/collection">
          <LuxuryButton>EXPLORE COLLECTION</LuxuryButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="font-display text-4xl tracking-[0.15em] mb-4 uppercase">Your Wishlist</h1>
        <p className="text-muted-foreground tracking-wide font-light">Saved reservations and favorite masterpieces.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-card border border-border group-hover:border-primary/50 transition-colors duration-500">
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
                
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-4 z-10">
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-destructive transition-colors border border-white/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleQuickAdd(product)}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-display text-sm tracking-wider mb-2 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                </Link>
                <div className="space-y-1">
                  <p className="text-muted-foreground tracking-widest">{formatPrice(product.price)}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-sans tracking-wide leading-none">({formatXAF(product.price)})</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
