"use client";

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { formatPrice, formatXAF } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function CartPage() {
  const { cart, updateItem, removeItem } = useCartWrapper();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container pt-32 pb-24 px-4 text-center min-h-screen">
        <h1 className="text-2xl font-display tracking-widest mb-4">
          YOUR CART IS EMPTY
        </h1>
        <Link href="/">
          <LuxuryButton>CONTINUE SHOPPING</LuxuryButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="container pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-6 border border-border p-4 bg-card"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 bg-muted" />

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-display tracking-wider">
                    {item.product.name}
                  </h3>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() =>
                        updateItem(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-4">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateItem(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* PRICE */}
                  <p className="tracking-widest flex flex-col items-end">
                    <span>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-muted-foreground opacity-70">
                      ({formatXAF(item.product.price * item.quantity)})
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-8 sticky top-32">
            <h2 className="font-display text-xl tracking-widest mb-6 border-b border-border pb-4">
              SUMMARY
            </h2>

            <div className="space-y-4 mb-8 text-sm tracking-wider text-muted-foreground font-light">
              <div className="flex justify-between items-baseline">
                <span>Subtotal</span>
                <div className="text-right">
                  <div className="text-foreground">
                    {formatPrice(cart.total)}
                  </div>
                  <div className="text-[10px] opacity-60">
                    ({formatXAF(cart.total)})
                  </div>
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
                <div className="text-primary">
                  {formatPrice(cart.total)}
                </div>
                <div className="text-[10px] text-muted-foreground tracking-widest font-sans">
                  ({formatXAF(cart.total)})
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <LuxuryButton className="w-full group">
                CHECKOUT
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}