import { useStripeProducts } from '../queries/stripe/products';
import { useCart } from '../context/cart';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { state } = useCart();
  const { products, isLoading } = useStripeProducts();

  const validatedItems = isLoading ? [] : validateItems(state.items, products);

  return (
    <div>
      <h1>Cart</h1>
      {validatedItems.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </div>
  );
};

const validateItems = (items, products) => {
  const newArr = items.filter((item) => {
    return products.data.find((product) => item.id === product.metadata.sanityId);
  });

  return newArr || [];
};

export default Cart;
