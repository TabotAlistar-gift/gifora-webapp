import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl tracking-[0.2em] text-primary mb-6">GIFORA</h3>
            <p className="text-muted-foreground leading-relaxed">
              Handcrafted fashion designed to blend artistry with luxury. 
              Limited-edition pieces that stand out through detailed craftsmanship 
              and premium aesthetics.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/collection" className="text-muted-foreground hover:text-primary transition-colors">All Collection</Link></li>
              <li><Link href="/collection?category=crochet" className="text-muted-foreground hover:text-primary transition-colors">Crochet Pieces</Link></li>
              <li><Link href="/collection?category=beaded-bag" className="text-muted-foreground hover:text-primary transition-colors">Beaded Bags</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GIFORA. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
