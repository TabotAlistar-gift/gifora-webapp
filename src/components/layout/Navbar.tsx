import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, User, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { cn, getImagePath } from "@/lib/utils";
import { fetchNotifications } from "@/lib/api";
import { Notification } from "@/lib/mock-data";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCartWrapper();
  const { user, logout } = useAuth();
  const { isExpanded } = useSidebar();
  const [unreadCount, setUnreadCount] = useState(0);

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  
  const calculateUnreadCount = async () => {
    try {
      const data = await fetchNotifications();
      const savedReadStatus = JSON.parse(localStorage.getItem("gifora_read_notifications") || "[]");
      const unread = data.filter(n => !n.read && !savedReadStatus.includes(n.id)).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Notification count sync failed", error);
    }
  };

  useEffect(() => {
    calculateUnreadCount();

    const handleSync = () => {
      calculateUnreadCount();
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 20));
    
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("scroll", () => setIsScrolled(window.scrollY > 20));
    };
  }, []);

  const navLinks: { name: string; href: string }[] = [];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        )}
      >
        {/* Logo (Absolute Centered relative to Screen/Viewport) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
          <Link href="/" className="transition-transform hover:scale-105 active:scale-95 block">
            <span className="font-display text-2xl md:text-3xl tracking-[0.2em] font-bold text-primary whitespace-nowrap">
              GIFORA
            </span>
          </Link>
        </div>

        <div className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
          isExpanded ? "lg:pl-64" : "lg:pl-20"
        )}>
          <div className="flex items-center justify-between min-h-[40px]">
            {/* Left side: Mobile Menu Button */}
            <div className="flex-1 flex items-center justify-start">
              <button 
                className="md:hidden text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Spacer for centered logo */}
            <div className="flex-none w-32 md:w-48 invisible" aria-hidden="true" />

            {/* Right: Icons */}
            <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
              {user ? (
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="hidden lg:block text-[10px] tracking-widest uppercase text-primary font-bold truncate max-w-[100px]">
                    Welcome, {user.name.split(' ')[0]}
                  </span>
                  
                  {/* Notifications */}
                  <Link href="/notifications" className="text-foreground hover:text-primary transition-colors relative group p-1" title="Notifications">
                    <Bell className="w-5 h-5 lg:w-[1.2rem] lg:h-[1.2rem]" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-primary w-2 h-2 rounded-full border border-background animate-pulse" />
                    )}
                  </Link>

                  <Link href="/profile" className="text-foreground hover:text-primary transition-colors" title="Account Settings">
                    <User className="w-5 h-5 lg:w-[1.2rem] lg:h-[1.2rem] fill-primary/20" />
                  </Link>
                  <button 
                    onClick={logout}
                    className="hidden md:block text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors ml-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth" className="hidden md:block text-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
              <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative group">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background border-r border-border md:hidden flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-border">
              <span className="font-display text-xl tracking-[0.2em] text-primary">GIFORA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-foreground hover:text-primary" />
              </button>
            </div>
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-display tracking-widest uppercase hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-border my-4" />
              <div className="mb-4">
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground leading-none mb-1">Status</p>
                <p className="text-xs font-medium tracking-wider text-foreground">
                  {user ? user.name : "Guest Access"}
                </p>
                {user && (
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-[9px] tracking-widest text-primary uppercase hover:underline mt-1 block">View Profile</Link>
                )}
              </div>
              {user ? (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="text-sm font-medium tracking-widest uppercase hover:text-primary text-left"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/auth" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-widest uppercase hover:text-primary flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
