import { useParams } from "wouter";
import { Product } from "@/lib/mock-data";
import { fetchProducts } from "@/lib/api";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { formatPrice, formatXAF, getImagePath } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  const { addToCart, isAdding } = useCartWrapper();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allProducts = await fetchProducts();
        const found = allProducts.find(p => p.id === Number(id));
        if (found) {
          setProduct(found);
          setRelatedProducts(allProducts.filter(p => p.id !== found.id).slice(0, 4));
        }
      } catch (error) {
        console.error("Artisanal detail sync failed", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (isDataLoading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-32 text-center font-display text-xl text-destructive uppercase tracking-widest">Masterpiece Not Found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your bag.`,
      className: "bg-card border-primary text-foreground",
    });
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] bg-card border border-border relative overflow-hidden"
        >
          {product.imageUrl ? (
            <img 
              src={getImagePath(product.imageUrl) || ""} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-display text-2xl tracking-widest bg-secondary">
              GIFORA
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-32"
        >
          <div className="mb-2 text-primary tracking-widest text-xs uppercase">
            {product.category.replace('-', ' ')}
          </div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-[0.1em] mb-6">{product.name}</h1>
          <div className="flex flex-col mb-8">
            <p className="text-3xl font-light tracking-wider text-foreground">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-muted-foreground/60 tracking-[0.2em] font-sans mt-2">
              ({formatXAF(product.price)})
            </p>
          </div>

          <div className="prose prose-invert prose-p:text-foreground/80 prose-p:font-light prose-p:leading-relaxed mb-12">
            <p>{product.description}</p>
          </div>

          <div className="h-px w-full bg-border mb-8" />

          {product.stock > 0 ? (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <span className="text-sm tracking-widest uppercase text-muted-foreground">Quantity</span>
                <div className="flex items-center border border-border">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:text-primary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="p-3 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <LuxuryButton 
                className="w-full" 
                onClick={handleAddToCart}
                isLoading={isAdding}
              >
                ADD TO BAG
              </LuxuryButton>
              <p className="text-center text-xs text-muted-foreground tracking-widest mt-4">
                {product.stock} items remaining
              </p>
            </div>
          ) : (
            <div className="bg-secondary/50 border border-border p-6 text-center">
              <h3 className="font-display text-xl tracking-widest text-muted-foreground">OUT OF STOCK</h3>
              <p className="text-sm text-muted-foreground mt-2 font-light">This limited edition piece is currently unavailable.</p>
            </div>
          )}

          <div className="mt-16 space-y-4 text-sm font-light text-muted-foreground">
            <div className="flex gap-4 items-start">
              <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
              <p>Handcrafted to order. Please allow subtle variations in beadwork or stitching.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
              <p>Complimentary luxury packaging included with every order.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <div className="mt-32">
        <h2 className="font-display text-2xl tracking-[0.2em] mb-12 border-b border-border pb-6">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-card border border-border group-hover:border-primary/50 transition-colors">
                  {p.imageUrl ? (
                    <img 
                      src={getImagePath(p.imageUrl) || ""} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-display tracking-widest text-sm">
                      GIFORA
                    </div>
                  )}
                </div>
                <h3 className="font-display text-sm tracking-wider group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-muted-foreground text-xs tracking-widest mt-1 flex flex-col">
                  <span>{formatPrice(p.price)}</span>
                  <span className="opacity-50 font-sans tracking-normal">({formatXAF(p.price)})</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
