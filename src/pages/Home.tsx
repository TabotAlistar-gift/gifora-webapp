import { motion } from "framer-motion";
import { Link } from "wouter";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { getFeaturedProducts } from "@/lib/mock-data";
import { formatPrice, getImagePath } from "@/lib/utils";

export default function Home() {
  const products = getFeaturedProducts();

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImagePath("images/hero-luxury.png") || ""}
            alt="GIFORA Luxury Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] text-primary mb-6"
          >
            GIFORA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/90 font-light tracking-wide mb-12 max-w-2xl mx-auto"
          >
            Handcrafted luxury. Exclusive crochet pieces and beaded bags, designed for the bold and elegant.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link href="/collection">
              <LuxuryButton>Explore Collection</LuxuryButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-4xl tracking-widest mb-4">SIGNATURE PIECES</h2>
          <div className="w-24 h-px bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-card border border-border group-hover:border-primary/50 transition-colors duration-500">
                  {product.imageUrl ? (
                    <img 
                      src={getImagePath(product.imageUrl) || ""} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-display tracking-widest">
                      GIFORA
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg tracking-wider mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground tracking-widest">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link href="/collection">
            <LuxuryButton variant="outline">View All</LuxuryButton>
          </Link>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="relative py-32 overflow-hidden border-y border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImagePath("images/brand-texture.png") || ""}
            alt="Craftsmanship texture" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl tracking-widest text-primary mb-8"
          >
            THE ART OF MAKING
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg leading-relaxed text-foreground/80 font-light mb-12"
          >
            Every GIFORA piece is a testament to patience and precision. We believe that true luxury lies in the details—the careful selection of materials, the rhythm of the crochet hook, and the meticulous placement of each bead. Our collections are limited, ensuring that your piece remains as unique as you are.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
