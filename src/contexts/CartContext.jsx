import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const storageKey = 'atelier-cart';

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const item = items.find((current) => current.id === action.product.id);
      return item
        ? items.map((current) => current.id === item.id ? { ...current, quantity: current.quantity + 1 } : current)
        : [...items, { ...action.product, quantity: 1 }];
    }
    case 'removeOne':
      return items.flatMap((item) => item.id !== action.id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []);
    case 'remove': return items.filter((item) => item.id !== action.id);
    case 'clear': return [];
    default: return items;
  }
}

function initialCart() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, initialCart);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem: (product) => dispatch({ type: 'add', product }),
    removeOne: (id) => dispatch({ type: 'removeOne', id }),
    removeItem: (id) => dispatch({ type: 'remove', id }),
    clearCart: () => dispatch({ type: 'clear' }),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
