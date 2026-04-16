import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";

export default function ArtisanJourney() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="font-display text-5xl md:text-6xl tracking-[0.2em] text-primary mb-8">THE ARTISAN JOURNEY</h1>
          <p className="text-xl text-foreground/80 font-light tracking-wide leading-relaxed">
            Every thread tells a story. From the first stitch to the final bead, witness the painstaking process of creating a GIFORA masterpiece.
          </p>
        </motion.div>

        <div className="space-y-32">
          {/* Section 1: The Design */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-display text-2xl tracking-[0.2em] mb-6 border-b border-primary/20 pb-4">VISION ON PAPER</h2>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                It starts with a heartbeat—an inspiration from nature, architecture, or the rhythm of the city. Sketches are meticulously drafted, mapping out every tension and bead placement before the first thread is even selected.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-card border border-border p-4"
            >
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground font-display tracking-widest text-sm">
                [SKETCH PHOTO PLACEHOLDER]
              </div>
            </motion.div>
          </section>

          {/* Section 2: The Material */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-card border border-border p-4 order-last md:order-first"
            >
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground font-display tracking-widest text-sm">
                [MATERIAL PHOTO PLACEHOLDER]
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-display text-2xl tracking-[0.2em] mb-6 border-b border-primary/20 pb-4">CURATED TEXTURES</h2>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                We select only the finest ethically sourced cottons and high-end glass beads. Each material is chosen for its weight, sheen, and durability, ensuring that your GIFORA piece becomes a legacy item.
              </p>
            </motion.div>
          </section>

          {/* Section 3: The Craft */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-display text-2xl tracking-[0.2em] mb-6 border-b border-primary/20 pb-4">RHYTHM & PRECISION</h2>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                Our artisans work with a rhythm that spans generations. A single crochet set can take over 40 hours of focused manual labor. There is no machine that can replicate the tension and soul of a hand-worked GIFORA piece.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-card border border-border p-4"
            >
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground font-display tracking-widest text-sm">
                [HANDS AT WORK PHOTO PLACEHOLDER]
              </div>
            </motion.div>
          </section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-card border border-primary/10 text-center"
        >
          <h3 className="font-display text-xl tracking-[0.3em] text-primary mb-6">ONE PIECE AT A TIME</h3>
          <p className="text-muted-foreground font-light mb-0 italic font-serif">
            "We aren't just making clothes; we are preserving an art form."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
