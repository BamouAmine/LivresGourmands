import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book, quantity = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === book.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) }
            : item
        );
      }
      return [...currentCart, { ...book, quantity: Math.min(quantity, book.stock) }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.prix * item.quantity, 0), [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
