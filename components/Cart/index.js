import { CartProvider } from 'use-shopping-cart';

const Cart = ({ children }) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/success`}
      cancelUrl={process.env.NEXT_PUBLIC_DOMAIN_URL}
      currency="EUR"
      billingAddressCollection={true}
    >
      {children}
    </CartProvider>
  );
};

export default Cart;
