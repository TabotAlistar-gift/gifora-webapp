import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";


const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(10, "Full shipping address is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cart } = useCartWrapper();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user?.name || "",
      customerEmail: user?.email || "",
    }
  });

  const { setCheckoutData } = useCartWrapper();

  const onSubmit = (data: CheckoutForm) => {
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) return;
    setIsPending(true);
    setTimeout(() => {
      setCheckoutData(data);
      setIsPending(false);
      toast({ title: "Details Secured", description: "Redirecting to GIFORA Pay...", className: "bg-primary text-primary-foreground" });
      setLocation("/payment");
    }, 1000);
  };

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="font-display text-3xl tracking-[0.15em] mb-12 text-center">SECURE CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section className="bg-card border border-border p-8">
          <h2 className="font-display text-xl tracking-widest mb-8 border-b border-border pb-4 uppercase">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Full Name</label>
                <input 
                  {...register("customerName")}
                  className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="First and Last Name"
                />
                {errors.customerName && <p className="text-red-500 text-[10px] tracking-widest uppercase">{errors.customerName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Email Address</label>
                <input 
                  {...register("customerEmail")}
                  className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="email@example.com"
                />
                {errors.customerEmail && <p className="text-red-500 text-[10px] tracking-widest uppercase">{errors.customerEmail.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2 font-bold opacity-60">Phone (Optional)</label>
              <input 
                {...register("customerPhone")}
                className="w-full bg-card border border-border p-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2 font-bold opacity-60">Complete Address</label>
              <textarea 
                {...register("shippingAddress")}
                rows={3}
                className="w-full bg-card border border-border p-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              {errors.shippingAddress && <p className="text-destructive text-xs mt-1">{errors.shippingAddress.message}</p>}
            </div>

            <LuxuryButton 
              type="submit" 
              className="w-full mt-8"
              isLoading={isPending}
            >
              PLACE ORDER
            </LuxuryButton>
          </form>
        </section>

        {/* Order Summary */}
        <div className="bg-card border border-border p-8 h-fit">
          <h2 className="font-display text-xl tracking-widest mb-6 border-b border-border pb-4">YOUR ORDER</h2>
          <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
            {Array.isArray(cart?.items) && cart.items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 aspect-[4/5] bg-secondary border border-border shrink-0">
                  {item.product.imageUrl && <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 text-sm font-light">
                  <p className="font-medium tracking-wide mb-1 uppercase">{item.product.name}</p>
                  <p className="text-muted-foreground lowercase">Quantity: {item.quantity}</p>
                  <div className="text-sm tracking-widest mt-1">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-6 space-y-4 text-sm tracking-wider text-muted-foreground font-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-foreground">{formatPrice(cart.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="text-foreground">Complimentary</span>
            </div>
            <div className="flex justify-between font-display text-lg text-foreground pt-4 border-t border-border mt-4">
              <span>Total</span>
              <span className="text-primary">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
