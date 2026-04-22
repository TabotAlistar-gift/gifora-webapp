import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useToast } from "@/hooks/use-toast";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Languages, 
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Activity,
  ShoppingBag
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Profile() {
  const { user, updateUser, socket } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(socket?.connected || false);

  useEffect(() => {
    if (!socket) return;
    
    const onConnect = () => setIsOnline(true);
    const onDisconnect = () => setIsOnline(false);
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    // Check initial state in case events fired before mount
    setIsOnline(socket.connected);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    country: user?.country || "",
    language: user?.language || "English",
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("gifora_token");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isPinVisible, setIsPinVisible] = useState(false);

  const currentPinDisplay = user?.pin 
    ? (isPinVisible ? user.pin : "•".repeat(user.pin.length)) 
    : "••••••";

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

  const handlePinReset = () => {
    if (newPin.length !== 6) {
      toast({
        title: "Invalid Length",
        description: "Your security PIN must be exactly 6 digits.",
        variant: "destructive"
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast({
        title: "Mismatch",
        description: "The confirmation PIN does not match. Please re-enter.",
        variant: "destructive"
      });
      return;
    }

    updateUser({ pin: newPin });
    setIsPinModalOpen(false);
    setNewPin("");
    setConfirmPin("");
    
    toast({
      title: "Security Updated",
      description: "Your private key has been successfully recalibrated.",
      className: "bg-primary text-primary-foreground border-none"
    });
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-8 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="font-display text-4xl tracking-widest uppercase">Your Profile</h1>
            <div className={`flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest uppercase border ${isOnline ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'border-red-500/50 text-red-500 bg-red-500/10'}`}>
              <Activity className="w-3 h-3" />
              {isOnline ? 'System Online' : 'System Offline'}
            </div>
          </div>
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
                  <div className="text-right flex items-center gap-4">
                     <div>
                        <span className="block text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1 font-bold text-right">Current PIN</span>
                        <span className="font-display tracking-[0.5em] text-primary">{currentPinDisplay}</span>
                     </div>
                     <button 
                        onClick={() => setIsPinVisible(!isPinVisible)}
                        className="p-2 hover:bg-primary/10 transition-colors text-primary/60 hover:text-primary"
                        title={isPinVisible ? "Hide PIN" : "Show PIN"}
                     >
                        {isPinVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                  </div>
                  <LuxuryButton 
                    variant="outline" 
                    className="text-[10px] py-2"
                    onClick={() => setIsPinModalOpen(true)}
                  >
                    RESET PIN
                  </LuxuryButton>
               </div>
            </section>

        {/* Order History */}
        <section className="md:col-span-2 bg-card border border-border p-8">
          <div className="flex items-center gap-3 text-primary border-b border-border pb-4 mb-6">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-display text-xl tracking-widest uppercase">Order History</h2>
          </div>
          
          {isLoadingOrders ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-sm tracking-widest uppercase font-light text-center py-8">No past reservations found.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center p-4 border border-border bg-background/50 hover:border-primary/30 transition-colors">
                  <div>
                    <p className="font-display tracking-widest uppercase text-sm mb-1 text-primary">Order #{order.id.toString().padStart(6, '0')}</p>
                    <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm tracking-wider mb-1">${order.total.toFixed(2)}</p>
                    <p className={`text-[10px] tracking-widest uppercase font-bold ${order.status === 'completed' ? 'text-green-500' : 'text-primary'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
         </div>

      {/* Reset PIN Modal */}
      <Dialog open={isPinModalOpen} onOpenChange={setIsPinModalOpen}>
        <DialogContent className="max-w-md bg-card border border-border p-8 rounded-none">
          <DialogHeader className="mb-8">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="font-display text-2xl tracking-widest uppercase mb-2">Reset Security PIN</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-light leading-relaxed">
              Define a new 6-digit private key to secure your artisanal transactions and identity.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            <div className="space-y-4">
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">New Security PIN</label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={newPin} onChange={setNewPin}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={1} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={2} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={3} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={4} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={5} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Confirm New PIN</label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={confirmPin} onChange={setConfirmPin}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={1} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={2} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={3} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={4} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                    <InputOTPSlot index={5} className="w-10 h-10 md:w-12 md:h-12 border-border focus:ring-primary" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-4 sm:justify-start">
            <LuxuryButton 
              className="flex-1" 
              onClick={handlePinReset}
              disabled={newPin.length !== 6 || confirmPin.length !== 6}
            >
              UPDATE PRIVATE KEY
            </LuxuryButton>
            <LuxuryButton 
              variant="outline" 
              className="flex-1" 
              onClick={() => setIsPinModalOpen(false)}
            >
              CANCEL
            </LuxuryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
