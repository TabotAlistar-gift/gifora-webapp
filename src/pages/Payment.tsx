import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  Lock,
  ArrowLeft
} from "lucide-react";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { formatPrice, cn } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const { cart, clearCart, checkoutData, setLastOrder } = useCartWrapper();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "wallet" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State for Card Demo - initialized with Patron name from checkout
  const [cardData, setCardData] = useState({
    number: "",
    name: checkoutData?.customerName || "",
    expiry: "",
    cvc: ""
  });

  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate a luxury processing time
    setTimeout(() => {
      const orderId = (Math.floor(Math.random() * 900000) + 100000).toString();
      
      // Save order summary for the success page
      setLastOrder({
        id: orderId,
        items: [...cart.items],
        total: cart.total,
        customerEmail: checkoutData?.customerEmail || "user@gifora.luxury",
        status: "confirmed"
      });

      setIsProcessing(false);
      setIsSuccess(true);
      toast({
        title: "Payment Verified",
        description: "Your GIFORA transaction was successful.",
        className: "bg-primary text-primary-foreground border-none"
      });
      // Clear the cart on success
      clearCart();
      setTimeout(() => setLocation(`/success/${orderId}`), 2000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-40 px-4 flex flex-col items-center justify-start text-center">
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", stiffness: 200 }}
           className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>
        <h1 className="font-display text-4xl tracking-[0.2em] mb-4 uppercase">Payment Secured</h1>
        <p className="text-muted-foreground font-light tracking-widest mb-12 max-w-md uppercase text-sm">
          Your handcrafted piece has been reserved. You will receive a luxury confirmation shortly.
        </p>
        <Link href="/">
          <LuxuryButton variant="outline" className="px-12">Return to Boutique</LuxuryButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
        <div>
          <h1 className="font-display text-3xl tracking-[0.15em] mb-2 uppercase">GIFORA Pay</h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-light flex items-center gap-2">
            <Lock className="w-3 h-3 text-primary" /> End-to-End Encrypted Secure Portal
          </p>
        </div>
        <Link href="/cart" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
           <ArrowLeft className="w-3 h-3" /> Back to Bag
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Card Interaction */}
        <div className="space-y-12">
          {/* Virtual Gold Card */}
          <motion.div 
            initial={{ rotateY: -15, rotateX: 10 }}
            whileHover={{ rotateY: 0, rotateX: 0 }}
            className="w-full aspect-[1.6/1] rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#121212] border border-white/10 shadow-2xl preserve-3d group cursor-default"
          >
            {/* Holographic Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.15),transparent_70%)] opacity-50 pointer-events-none" />
            <div className="absolute -right-4 top-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-gradient-to-br from-primary via-primary/80 to-primary/40 rounded-md shadow-inner flex items-center justify-center">
                  <div className="w-full h-px bg-black/10 absolute rotate-12" />
                  <div className="w-full h-px bg-black/10 absolute -rotate-12" />
                </div>
                <span className="font-display text-primary tracking-[0.2em] font-bold text-xl drop-shadow-lg">GIFORA</span>
              </div>

              <div className="space-y-6">
                <div className="font-display text-2xl tracking-[0.3em] font-light text-foreground/90 tabular-nums">
                  {cardData.number || "**** **** **** ****"}
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground block font-bold">Holder</span>
                    <span className="text-sm tracking-[0.2em] uppercase font-light truncate max-w-[150px] inline-block">
                      {cardData.name || "Guest User"}
                    </span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground block font-bold">Expires</span>
                    <span className="text-sm tracking-[0.2em] font-light tabular-nums">
                      {cardData.expiry || "MM/YY"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Brushed Metal Texture Mask */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
          </motion.div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: "card", label: "Luxury Card", icon: CreditCard },
              { id: "wallet", label: "GIFORA App", icon: Smartphone },
              { id: "transfer", label: "Boutique Bank", icon: Building2 },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={cn(
                  "p-4 border transition-all duration-500 relative flex flex-col items-center gap-3",
                  selectedMethod === method.id 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-border hover:border-primary/50 text-muted-foreground"
                )}
              >
                <method.icon className={cn("w-5 h-5", selectedMethod === method.id ? "scale-110" : "scale-100")} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-bold">{method.label}</span>
                {selectedMethod === method.id && (
                  <motion.div layoutId="selectionCircle" className="absolute -top-1 -right-1">
                     <CheckCircle2 className="w-4 h-4 text-primary fill-background" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Inputs & Summary */}
        <div className="space-y-12">
          <div className="bg-card border border-border p-8 relative">
            <h2 className="font-display text-xl tracking-widest mb-8 border-b border-border pb-4 uppercase">Transaction Details</h2>
            
            <form className="space-y-6 mb-12">
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Personal Card Number</label>
                    <input 
                       maxLength={19}
                       onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                       placeholder="**** **** **** ****"
                       className="w-full bg-background/50 border border-border p-3 text-foreground tracking-[0.2em] focus:outline-none focus:border-primary transition-colors text-sm font-light uppercase"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Full Name</label>
                       <input 
                          onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Name"
                          className="w-full bg-background/50 border border-border p-3 text-foreground tracking-[0.15em] focus:outline-none focus:border-primary transition-colors text-sm font-light uppercase"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Exp.</label>
                         <input 
                            maxLength={5}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            placeholder="MM/YY"
                            className="w-full bg-background/50 border border-border p-3 text-foreground tracking-[0.15em] focus:outline-none focus:border-primary transition-colors text-sm font-light text-center"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">CVC</label>
                         <input 
                            maxLength={3}
                            type="password"
                            onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                            placeholder="***"
                            className="w-full bg-background/50 border border-border p-3 text-foreground tracking-[0.15em] focus:outline-none focus:border-primary transition-colors text-sm font-light text-center"
                         />
                       </div>
                    </div>
                 </div>
              </div>
            </form>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex justify-between items-center bg-primary/5 p-4 border border-primary/20">
                 <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-bold">Authorized Reservation Total</span>
                 <span className="font-display text-xl text-primary font-bold">{formatPrice(cart?.total || 0)}</span>
              </div>
              
              <LuxuryButton 
                onClick={handleProcessPayment}
                className="w-full shadow-lg shadow-primary/10" 
                isLoading={isProcessing}
                disabled={!cart?.items || cart.items.length === 0}
              >
                AUTHORIZE SECURE PAYMENT
              </LuxuryButton>
              
              <div className="flex justify-center items-center gap-6 pt-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-light">
                 <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-primary" /> Verified Hub</span>
                 <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-primary" /> AES-256 Bit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
