import Link from 'next/link';
import { useCart } from '../../context/cart';

const Navbar = () => {
  const {
    state: { items },
  } = useCart();
  console.log(items);

  return (
    <div className="left-0 top-0 right-0 z-20 bg-white border-2 p-4">
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link href="/categories">Categories</Link>
        </li>
        <li className="mr-4">
          <Link href="/products">Products</Link>
        </li>
        <li className="mr-4">
          <Link href="/cart">Cart</Link>
        </li>
        <li className="mr-4">items: {items.length}</li>
      </ul>
    </div>
  );
};

export default Navbar;
