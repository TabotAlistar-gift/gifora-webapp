import { useState } from "react";
import { getProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().min(1, "Description required"),
  price: z.coerce.number().min(0, "Invalid price"),
  imageUrl: z.string().optional(),
  category: z.string().min(1, "Category required"),
  stock: z.coerce.number().min(0, "Invalid stock"),
  featured: z.boolean().default(false),
});

type ProductForm = z.infer<typeof productSchema>;

export default function Admin() {
  const [tab, setTab] = useState<"products" | "orders" | "add">("products");
  
  const products = getProducts();
  // Fake orders for the local mock version
  const orders = [
    { id: 999, customerName: "Test User", customerEmail: "test@example.com", createdAt: new Date().toISOString(), status: "confirmed", total: 150.0 }
  ];
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "crochet",
      featured: false,
    }
  });

  const onSubmit = (data: ProductForm) => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      toast({ title: "Product created (Mocked)" });
      setTab("products");
      reset();
    }, 500);
  };

  const handleDelete = (id: number) => {
    if(confirm("Delete this piece?")) {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        toast({ title: "Product deleted (Mocked)" });
      }, 500);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-display text-3xl tracking-[0.15em] mb-8">ATELIER DASHBOARD</h1>
      
      <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
        {(["products", "orders", "add"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-4 px-4 text-sm tracking-widest uppercase whitespace-nowrap border-b-2 transition-colors ${
              tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === 'add' ? 'Add Product' : t}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left text-sm font-light">
            <thead className="bg-secondary/50 text-muted-foreground uppercase tracking-widest text-xs">
              <tr>
                <th className="p-4">Piece</th>
                <th className="p-4 hidden md:table-cell">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.isArray(products) && products.map(p => (
                <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary shrink-0 overflow-hidden border border-border">
                      {p.imageUrl && <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <span className="font-medium tracking-wide">{p.name}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{p.category}</td>
                  <td className="p-4 tracking-widest">{formatPrice(p.price)}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="text-muted-foreground hover:text-destructive p-2"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "orders" && (
        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left text-sm font-light">
            <thead className="bg-secondary/50 text-muted-foreground uppercase tracking-widest text-xs">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 font-display tracking-widest">#{o.id}</td>
                  <td className="p-4">
                    <div>{o.customerName}</div>
                    <div className="text-xs text-muted-foreground">{o.customerEmail}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 uppercase tracking-widest text-xs text-primary">{o.status}</td>
                  <td className="p-4 text-right tracking-widest">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "add" && (
        <div className="max-w-2xl bg-card border border-border p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Piece Name</label>
                <input {...register("name")} className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none" />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Category</label>
                <select {...register("category")} className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none text-foreground appearance-none">
                  <option value="crochet">Crochet</option>
                  <option value="beaded-bag">Beaded Bag</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Price (USD)</label>
                <input type="number" step="0.01" {...register("price")} className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none" />
                {errors.price && <p className="text-destructive text-xs mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Stock Quantity</label>
                <input type="number" {...register("stock")} className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none" />
                {errors.stock && <p className="text-destructive text-xs mt-1">{errors.stock.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Image URL</label>
              <input {...register("imageUrl")} placeholder="https://images.unsplash.com/..." className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2">Description</label>
              <textarea {...register("description")} rows={4} className="w-full bg-background border border-border p-3 focus:border-primary focus:outline-none resize-none" />
              {errors.description && <p className="text-destructive text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" {...register("featured")} className="w-4 h-4 accent-primary bg-background border-border" />
              <label htmlFor="featured" className="text-sm font-light tracking-wide">Feature this piece on the homepage</label>
            </div>

            <LuxuryButton type="submit" isLoading={isCreating}>
              ADD TO COLLECTION
            </LuxuryButton>
          </form>
        </div>
      )}
    </div>
  );
}
