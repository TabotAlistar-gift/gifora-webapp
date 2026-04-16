import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Globe, Apple } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Information Required",
        description: "Please fulfill all elegance requirements before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (isLogin) {
      login(email, "User");
      toast({ title: "Welcome Back", description: "Your luxury journey continues." });
    } else {
      signup(email, name);
      toast({ title: "Account Created", description: "Welcome to the GIFORA Gilded Circle." });
    }
    setLocation("/");
  };

  const handleSocialMock = (platform: string) => {
    toast({
      title: `${platform} Connection`,
      description: "Secure handshake initiated. Redirecting to digital vault...",
      className: "bg-primary text-primary-foreground"
    });
    // Mock successful login after delay
    setTimeout(() => {
      login("user@example.com", "User");
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.05),transparent_70%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl tracking-[0.2em] text-primary mb-2 uppercase">
            {isLogin ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-muted-foreground text-xs tracking-widest uppercase font-light">
            {isLogin ? "Welcome back to Gifora." : "Join our artisan community."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/50 border border-border p-3 pl-10 text-foreground text-sm focus:outline-none focus:border-primary transition-colors tracking-wide"
                    placeholder="YOUR NAME"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background/50 border border-border p-3 pl-10 text-foreground text-sm focus:outline-none focus:border-primary transition-colors tracking-wide"
                placeholder="EMAIL@GIFORA.LUXURY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background/50 border border-border p-3 pl-10 text-foreground text-sm focus:outline-none focus:border-primary transition-colors tracking-wide"
                placeholder="••••••••"
              />
            </div>
          </div>

          <LuxuryButton type="submit" className="w-full" variant="primary">
            {isLogin ? "SIGN IN" : "SIGN UP"}
          </LuxuryButton>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full bg-border h-px" />
            <span className="absolute px-4 bg-card text-[10px] tracking-widest text-muted-foreground uppercase font-bold">Secure Access</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleSocialMock("Google")}
              className="flex items-center justify-center gap-2 border border-border p-3 hover:bg-white/5 transition-colors text-[10px] tracking-widest font-bold grayscale hover:grayscale-0"
            >
              <Globe className="w-4 h-4" /> GOOGLE
            </button>
            <button 
              onClick={() => handleSocialMock("Apple")}
              className="flex items-center justify-center gap-2 border border-border p-3 hover:bg-white/5 transition-colors text-[10px] tracking-widest font-bold"
            >
              <Apple className="w-4 h-4" /> APPLE
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
