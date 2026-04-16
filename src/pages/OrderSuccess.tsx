import { useParams, Link } from "wouter";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { useCartWrapper } from "@/hooks/use-cart-wrapper";

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const { lastOrder } = useCartWrapper();
  
  const order = lastOrder || {
    id: id || "999999",
    customerEmail: "patron@gifora.luxury",
    status: "confirmed",
    total: 0,
    items: []
  };

  if (!order && !id) return <div className="min-h-screen pt-32 text-center">Order not found</div>;

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8"
      >
        <CheckCircle2 className="w-20 h-20 text-primary mx-auto" />
      </motion.div>
      
      <h1 className="font-display text-4xl tracking-[0.1em] text-center mb-4">THANK YOU</h1>
      <p className="text-muted-foreground font-light tracking-wide text-center mb-12 max-w-md">
        Your order has been placed successfully. A confirmation email has been sent to {order.customerEmail}.
      </p>

      <div className="w-full max-w-2xl bg-card border border-border p-8 mb-12">
        <div className="flex justify-between items-end border-b border-border pb-6 mb-6">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Order Number</p>
            <p className="font-display text-xl tracking-widest">#{order.id.toString().padStart(6, '0')}</p>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Status</p>
            <p className="font-display text-primary tracking-widest uppercase">{order.status}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {Array.isArray(order?.items) && order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm font-light">
              <span>{item.quantity}x {item.product.name}</span>
              <span className="tracking-widest">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex justify-between font-display text-lg tracking-wider">
          <span>Total</span>
          <span className="text-primary">{formatPrice(order.total)}</span>
        </div>
      </div>

      <Link href="/">
        <LuxuryButton variant="outline">Return to Boutique</LuxuryButton>
      </Link>
    </div>
  );
}
