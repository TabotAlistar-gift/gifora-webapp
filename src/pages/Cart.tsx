import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { formatPrice, formatXAF } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

// ... (rest as before until line 75)
                    <p className="tracking-widest flex flex-col items-end">
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                      <span className="text-[10px] text-muted-foreground opacity-70">({formatXAF(item.product.price * item.quantity)})</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="font-display text-xl tracking-widest mb-6 border-b border-border pb-4">SUMMARY</h2>
              <div className="space-y-4 mb-8 text-sm tracking-wider text-muted-foreground font-light">
                <div className="flex justify-between items-baseline">
                  <span>Subtotal</span>
                  <div className="text-right">
                    <div className="text-foreground">{formatPrice(cart.total)}</div>
                    <div className="text-[10px] opacity-60">({formatXAF(cart.total)})</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline font-display text-lg tracking-wider mb-8 pt-4 border-t border-border">
                <span>Total</span>
                <div className="text-right">
                  <div className="text-primary">{formatPrice(cart.total)}</div>
                  <div className="text-[10px] text-muted-foreground tracking-widest font-sans">({formatXAF(cart.total)})</div>
                </div>
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
