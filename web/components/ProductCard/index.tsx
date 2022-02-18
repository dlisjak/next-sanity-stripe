import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '../../context/cart';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="relative">
      <Link href={`/products/${product.slug.current}`}>
        <a>
          <div className="relative w-full bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
            <Image
              src={product.productImgSrc}
              alt={'product alt'}
              width={450}
              height={450}
              layout="responsive"
            />
          </div>
        </a>
      </Link>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">Barva</p>
        </div>
        <p className="text-sm font-medium text-gray-900 pl-2">
          {product.defaultProductVariant.price}€
        </p>
      </div>
      <div className="flex justify-evenly">
        <button onClick={() => dispatch({ type: 'increment', productId: product._id })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement', productId: product._id })}>-</button>
      </div>
    </div>
  );
};

export default ProductCard;
