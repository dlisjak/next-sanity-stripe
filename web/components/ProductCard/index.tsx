import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.slug.current}`}>
      <a className="group relative">
        <div className="w-full bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
          <Image
            src={product.productImgSrc}
            alt={'product alt'}
            width={450}
            height={450}
            layout="responsive"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Barva</p>
          </div>
          <p className="text-sm font-medium text-gray-900 pl-2">
            {product.defaultProductVariant.price}€
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
