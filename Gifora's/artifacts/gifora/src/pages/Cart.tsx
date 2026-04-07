import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { formatPrice } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, isLoading, updateItem, removeItem } = useCartWrapper();

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const hasItems = Array.isArray(cart?.items) && cart.items.length > 0;

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl tracking-[0.15em] mb-12 text-center border-b border-border pb-8">SHOPPING BAG</h1>

      {!hasItems ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-8 font-light tracking-wide">Your bag is empty.</p>
          <Link href="/collection">
            <LuxuryButton variant="outline">Discover Collection</LuxuryButton>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {Array.isArray(cart?.items) && cart.items.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={item.id} 
                className="flex gap-6 pb-8 border-b border-border"
              >
                <div className="w-32 aspect-[4/5] bg-card border border-border shrink-0">
                  {item.product.imageUrl ? (
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-display">GIFORA</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-display text-lg tracking-wider hover:text-primary transition-colors">{item.product.name}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm tracking-widest text-muted-foreground uppercase">{item.product.category.replace('-',' ')}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-border">
                      <button 
                        onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateItem(item.id, Math.min(item.product.stock, item.quantity + 1))}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="tracking-widest">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="font-display text-xl tracking-widest mb-6 border-b border-border pb-4">SUMMARY</h2>
              <div className="space-y-4 mb-8 text-sm tracking-wider text-muted-foreground font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between font-display text-lg tracking-wider mb-8 pt-4 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatPrice(cart.total)}</span>
              </div>
              <Link href="/checkout">
                <LuxuryButton className="w-full group">
                  CHECKOUT <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
