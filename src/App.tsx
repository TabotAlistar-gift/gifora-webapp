import { Switch, Route, Router as WouterRouter } from "wouter";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Payment from "@/pages/Payment";
import Admin from "@/pages/Admin";
import ArtisanJourney from "@/pages/ArtisanJourney";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/not-found";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { useLocation, Redirect } from "wouter";
import { cn } from "@/lib/utils";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen bg-background" />;
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collection/:category?" component={Catalog} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <ProtectedRoute path="/checkout" component={Checkout} />
      <Route path="/success/:id" component={OrderSuccess} />
      <Route path="/payment" component={Payment} />
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/notifications" component={Notifications} />
      <ProtectedRoute path="/artisan-journey" component={ArtisanJourney} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isExpanded } = useSidebar();
  const isAuthPage = location.startsWith("/auth");

  return (
    <div className="min-h-screen flex relative selection:bg-primary selection:text-primary-foreground">
      <CursorSpotlight />
      {!isAuthPage && <Sidebar />}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-500",
        !isAuthPage && (isExpanded ? "lg:pl-64" : "lg:pl-20")
      )}>
        {!isAuthPage && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <CartProvider>
        <TooltipProvider>
          <WouterRouter base={((import.meta as any).env?.BASE_URL || "").replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
        </CartProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
