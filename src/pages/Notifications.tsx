import { motion, AnimatePresence } from "framer-motion";
import { Bell, Package, Sparkles, Shield, ChevronRight, Check } from "lucide-react";
import { Notification } from "@/lib/mock-data";
import { fetchNotifications, markNotificationAsRead } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      // Combine with local storage for unread counts if server is stateless
      const savedReadStatus = JSON.parse(localStorage.getItem("gifora_read_notifications") || "[]");
      const updated = data.map(n => ({
        ...n,
        read: n.read || savedReadStatus.includes(n.id)
      }));
      setNotifications(updated);
    } catch (error) {
      console.error("Sync failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    
    try {
      await markNotificationAsRead(id);
      const savedReadStatus = JSON.parse(localStorage.getItem("gifora_read_notifications") || "[]");
      if (!savedReadStatus.includes(id)) {
        localStorage.setItem("gifora_read_notifications", JSON.stringify([...savedReadStatus, id]));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error("Failed to sync read status", error);
    }
  };

  const markAllAsRead = async () => {
    const allIds = notifications.map(n => n.id);
    localStorage.setItem("gifora_read_notifications", JSON.stringify(allIds));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
    // In a real app, you'd have a bulk API endpoint
    for (const id of allIds) {
      markNotificationAsRead(id).catch(console.error);
    }
    
    window.dispatchEvent(new Event("storage"));

    toast({
      title: "All Cleared",
      description: "Your artisanal inbox is now pristine.",
      className: "bg-primary text-primary-foreground font-display tracking-widest text-[10px]"
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5 text-primary" />;
      case 'exclusive': return <Sparkles className="w-5 h-5 text-primary" />;
      case 'system': return <Shield className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-border pb-8"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-2">Personal Assistant</p>
        <h1 className="font-display text-4xl tracking-[0.15em] mb-4 uppercase">Notifications</h1>
        <p className="text-muted-foreground tracking-wide font-light italic">Stay updated with your artisanal acquisitions and exclusive brand movements.</p>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification, idx) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              layout
              onClick={() => markAsRead(notification.id)}
              className={cn(
                "group relative p-6 rounded-none border transition-all duration-500 cursor-pointer overflow-hidden",
                notification.read 
                  ? "bg-card/10 border-border/30 opacity-60 hover:opacity-100" 
                  : "bg-card border-primary/20 shadow-lg shadow-primary/5 hover:bg-card/80"
              )}
            >
              <div className="flex gap-6 items-start relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-none flex items-center justify-center border transition-all duration-500",
                  notification.read ? "border-border bg-background" : "border-primary/40 bg-primary/5 group-hover:bg-primary/10"
                )}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn(
                      "font-display tracking-widest text-lg uppercase transition-colors duration-500",
                      !notification.read ? "text-primary" : "text-foreground"
                    )}>
                      {notification.title}
                    </h3>
                    <span className="text-[10px] tracking-widest text-muted-foreground uppercase bg-secondary px-2 py-0.5 border border-border whitespace-nowrap ml-4">{notification.date}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl font-light tracking-wide">
                    {notification.message}
                  </p>
                </div>

                <div className="flex items-center self-center transition-all duration-500">
                   {notification.read ? (
                     <Check className="w-4 h-4 text-muted-foreground opacity-50" />
                   ) : (
                     <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                   )}
                </div>
              </div>
              
              {!notification.read && (
                <motion.div 
                  layoutId={`indicator-${notification.id}`}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary" 
                />
              )}
              
              {/* Subtle glassmorphism shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-32 border border-dashed border-border/50 bg-card/20 group">
          <Bell className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6 transition-transform duration-700 group-hover:scale-110" />
          <h2 className="font-display tracking-widest text-muted-foreground mb-2">SILENCE IS GOLDEN</h2>
          <p className="text-xs text-muted-foreground/60 tracking-[0.2em] font-light">YOUR NOTIFICATION TRAY IS CURRENTLY SERENE</p>
        </div>
      )}
      
      <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[10px] tracking-widest uppercase text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-primary rounded-full" />
          <span>GIFORA ASSISTANT v1.0</span>
        </div>
        <button 
          onClick={markAllAsRead}
          className="hover:text-primary transition-colors hover:underline group flex items-center gap-2"
        >
          Mark all as read
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
