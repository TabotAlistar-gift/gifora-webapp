import { Link, useLocation } from "wouter";
import { 
  Home, 
  LayoutGrid, 
  Wind, 
  Sparkles, 
  ShoppingBag, 
  User,
  CreditCard,
  Heart
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar();
  const [location] = useLocation();
  const { cart } = useCartWrapper();
  const { user } = useAuth();
  const cartItemCount = cart?.items?.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0) || 0;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Collection", href: "/collection", icon: LayoutGrid },
    { name: "Crochet", href: "/collection/crochet", icon: Wind },
    { name: "Beaded Bags", href: "/collection/beaded-bag", icon: Sparkles },
    { name: "Our Story", href: "/artisan-journey", icon: Heart },
    { name: "Payments", href: "/payment", icon: CreditCard },
    { name: "Shopping Bag", href: "/cart", icon: ShoppingBag, badge: cartItemCount },
    { name: "Account", href: user ? "/profile" : "/auth", icon: User },
  ];

  return (
    <motion.aside
      initial={false}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        "fixed left-0 top-0 h-full z-[100] bg-background/95 backdrop-blur-md border-r border-border transition-all duration-300 ease-in-out hidden lg:flex flex-col",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar Header (Logo/Indicator) */}
      <div className="h-24 flex items-center justify-center border-b border-border mb-8 overflow-hidden relative">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
             <span className="font-display font-bold text-xl text-primary">G</span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display text-xl tracking-[0.2em] font-bold text-primary whitespace-nowrap"
              >
                GIFORA
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-4">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group relative flex items-center h-12 rounded-none transition-all duration-300 cursor-pointer overflow-hidden",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-full bg-primary"
                  />
                )}
                
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-1")} />
                  {(item.badge ?? 0) > 0 && !isExpanded && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 flex items-center justify-between ml-2 pr-4"
                    >
                      <span className="text-sm font-medium tracking-widest uppercase truncate">
                        {item.name}
                      </span>
                      {(item.badge ?? 0) > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hover Background */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile/Admin Snippet (Only visible when expanded) */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 h-12 px-2">
           <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
              <User className="w-4 h-4 text-muted-foreground" />
           </div>
           <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                 <p className="text-[10px] tracking-widest uppercase text-muted-foreground leading-none mb-1">Status</p>
                 <p className="text-xs font-medium tracking-wider text-foreground">
                   {user ? user.name : "Guest Access"}
                 </p>
                 {user && (
                   <Link href="/profile" className="text-[9px] tracking-widest text-primary uppercase hover:underline mt-1 block">View Profile</Link>
                 )}
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
