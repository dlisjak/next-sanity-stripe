import { CartProvider } from 'use-shopping-cart';

const Cart = ({ children }) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="EUR"
    >
      {children}
    </CartProvider>
  );
};

export default Cart;
