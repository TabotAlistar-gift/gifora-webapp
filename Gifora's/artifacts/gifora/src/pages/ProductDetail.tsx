import { useParams } from "wouter";
import { getProductById } from "@/lib/mock-data";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const isLoading = false;
  const isError = !product;
  const { addToCart, isAdding } = useCartWrapper();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (isError || !product) {
    return <div className="min-h-screen pt-32 text-center font-display text-xl text-destructive">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
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
              src={product.imageUrl} 
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
          <p className="text-2xl font-light tracking-wider text-muted-foreground mb-8">
            {formatPrice(product.price)}
          </p>

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
    </div>
  );
}
