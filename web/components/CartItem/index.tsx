import { useSanityProduct } from '../../queries/sanity/product';

const CartItem = ({ item }) => {
  const { product, isLoading, isError } = useSanityProduct(item.id);

  return (
    <div className={`flex p-4 border-2 ${isError ? 'border-rose-600' : 'border-slate-200'}`}>
      <div className="mr-4">{product.title}</div>
      <div className="mr-4">{product.defaultProductVariant.price}</div>
      <div className="mr-4">{item.quantity}</div>
    </div>
  );
};

export default CartItem;
