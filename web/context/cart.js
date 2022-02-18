import { createContext, useReducer, useContext } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
  const exists = state.items.find(item => item.id === action.productId);

  switch (action.type) {
    case 'increment': {
      if (exists) {
        state.items.forEach(item => {
          if (item.id === action.productId) {
            item.quantity++;
          }
        });

        return { ...state, items: [...state.items] };
      } else {
        return { ...state, items: [...state.items, { id: action.productId, quantity: 1 }] }
      }
    }

    case 'decrement': {
      if (!exists) return state;
      state.items.forEach((item, i) => {
        if (item.id === action.productId) {
          if (item.quantity === 1) {
            state.items.splice(i, 1);
          } else {
            item.quantity--;
          }
        }
      });

      return { ...state, items: [...state.items] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }

  return context
}

export { CartProvider, useCart }
