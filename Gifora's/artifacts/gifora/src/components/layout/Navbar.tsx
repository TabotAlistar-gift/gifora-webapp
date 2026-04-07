import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartWrapper } from "@/hooks/use-cart-wrapper";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cart } = useCartWrapper();

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "/collection" },
    { name: "Crochet", href: "/collection?category=crochet" },
    { name: "Beaded Bags", href: "/collection?category=beaded-bag" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 lg:pl-20",
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-display text-2xl md:text-3xl tracking-[0.2em] font-bold text-primary">
              GIFORA
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hidden md:block text-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </Link>
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
              <Link 
                href="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium tracking-widest uppercase hover:text-primary flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Admin Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
