import { useCartContext } from "../context/CartContext";
import { getProductById } from "../lib/mock-data";

export function useCartWrapper() {
  const cartContext = useCartContext();

  return {
    cart: cartContext.cart,
    isLoading: cartContext.isLoading,
    sessionId: "local-session",
    addToCart: (productId: number, quantity: number = 1) => {
      const product = getProductById(productId);
      if (product) {
        cartContext.addToCart(product, quantity);
      }
    },
    updateItem: (itemId: number, quantity: number) => {
      cartContext.updateItemQuantity(itemId, quantity);
    },
    removeItem: (itemId: number) => {
      cartContext.removeItem(itemId);
    },
    clearCart: () => {
      cartContext.clearCart();
    },
    checkoutData: cartContext.checkoutData,
    setCheckoutData: cartContext.setCheckoutData,
    lastOrder: cartContext.lastOrder,
    setLastOrder: cartContext.setLastOrder,
    isAdding: false,
  };
}
