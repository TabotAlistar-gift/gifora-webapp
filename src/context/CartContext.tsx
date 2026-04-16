import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../lib/mock-data";

export interface CartItem {
  id: number; // A local unique id for the cart item
  productId: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface OrderSummary {
  id: string;
  items: CartItem[];
  total: number;
  customerEmail: string;
  status: string;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData | null) => void;
  lastOrder: OrderSummary | null;
  setLastOrder: (order: OrderSummary | null) => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gifora_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("gifora_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: Date.now(), productId: product.id, product, quantity }];
    });
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, total },
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        checkoutData,
        setCheckoutData,
        lastOrder,
        setLastOrder,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
