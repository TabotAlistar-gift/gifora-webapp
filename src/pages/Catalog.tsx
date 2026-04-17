import { Product } from "@/lib/mock-data";
import { fetchProducts } from "@/lib/api";
import { formatPrice, formatXAF, getImagePath } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, MessageSquare, ChevronDown } from "lucide-react";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function Catalog({ params }: { params: { category?: string } }) {
  const [location] = useLocation();
  const categoryParam = params.category;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Collection sync failed", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = categoryParam 
      ? allProducts.filter(p => p.category === categoryParam)
      : allProducts;
    setProducts(filtered);
  }, [categoryParam, allProducts]);

  const displayedProducts = products.slice(0, visibleCount);
  
  const { addToCart } = useCartWrapper();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Reset visibleCount when category changes
  useEffect(() => {
    setVisibleCount(9);
  }, [categoryParam]);

  // Load wishlist from local storage
  useEffect(() => {
    const saved = localStorage.getItem("gifora_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const handleSeeMore = () => {
    setIsLoading(true);
    // Mimic artisanal loading delay for luxury feel
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsLoading(false);
    }, 800);
  };

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
            href="/collection/crochet" 
            className={`hover:text-primary transition-colors ${categoryParam === 'crochet' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Crochet
          </Link>
          <Link 
            href="/collection/beaded-bag" 
            className={`hover:text-primary transition-colors ${categoryParam === 'beaded-bag' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Beaded Bags
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {displayedProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx % 9 * 0.1 }}
              layout
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
                  <div className="space-y-1">
                    <p className="text-muted-foreground tracking-widest">{formatPrice(product.price)}</p>
                    <p className="text-[10px] text-muted-foreground/60 font-sans tracking-wide leading-none">({formatXAF(product.price)})</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {products.length > visibleCount && (
        <div className="mt-20 text-center">
          <LuxuryButton 
            onClick={handleSeeMore}
            disabled={isLoading}
            className="group px-12 relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <span className="flex items-center gap-2">
                ENLARGE COLLECTION <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            )}
          </LuxuryButton>
        </div>
      )}
    </div>
  );
}
