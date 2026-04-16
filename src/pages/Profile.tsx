import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Languages, 
  Lock,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    country: user?.country || "",
    language: user?.language || "English",
    pin: "••••••" // Mock PIN
  });

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      country: formData.country,
      language: formData.language
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your account details have been successfully synchronized.",
      className: "bg-primary text-primary-foreground border-none"
    });
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-8 gap-6">
        <div>
          <h1 className="font-display text-4xl tracking-widest mb-2 uppercase">Your Profile</h1>
          <p className="text-muted-foreground tracking-[0.2em] text-xs uppercase font-light">Manage your digital identity and preferences</p>
        </div>
        <LuxuryButton 
          variant={isEditing ? "primary" : "outline"} 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "SAVE CHANGES" : "EDIT PROFILE"}
        </LuxuryButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <section className="bg-card border border-border p-8 space-y-8">
          <div className="flex items-center gap-3 text-primary border-b border-border pb-4">
            <UserIcon className="w-5 h-5" />
            <h2 className="font-display text-xl tracking-widest uppercase">Personal Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Full Name</label>
              <input 
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-background/50 border border-border p-3 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Digital Identity (Email)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
                <input 
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-background/50 border border-border p-3 pl-10 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
                <input 
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-background/50 border border-border p-3 pl-10 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences & Security */}
        <section className="bg-card border border-border p-8 space-y-8">
          <div className="flex items-center gap-3 text-primary border-b border-border pb-4">
            <Globe className="w-5 h-5" />
            <h2 className="font-display text-xl tracking-widest uppercase">Preferences</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Correspondence Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 w-4 h-4 text-primary opacity-50" />
                <textarea 
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={2}
                  className="w-full bg-background/50 border border-border p-3 pl-10 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide resize-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Country</label>
                <input 
                  disabled={!isEditing}
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  placeholder="United Kingdom"
                  className="w-full bg-background/50 border border-border p-3 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-bold">Language</label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
                  <select 
                    disabled={!isEditing}
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full bg-background/50 border border-border p-3 pl-10 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-all tracking-wide appearance-none"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Italian</option>
                    <option>Yoruba</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Verification */}
        <section className="md:col-span-2 bg-primary/5 border border-primary/20 p-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                 </div>
                 <div>
                    <h3 className="font-display text-lg tracking-widest uppercase mb-1">Security PIN</h3>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase font-light">Your private key for secure transactions</p>
                 </div>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-right">
                    <span className="block text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1 font-bold">Current PIN</span>
                    <span className="font-display tracking-[0.5em] text-primary">{formData.pin}</span>
                 </div>
                 <LuxuryButton variant="outline" className="text-[10px] py-2">RESET PIN</LuxuryButton>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
