import Link from 'next/link';
import Image from 'next/image';

const Products = ({ products }) => {
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <Link href={`/products/${product.slug.current}`} key={product._id}>
            <a className="flex justify-center flex-col text-center border-2">
              <h3 className="my-4">{product.title}</h3>
              <Image src={product.productImgSrc} width={250} height={250} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const sanity = (await import('../../utils/sanity/client')).default;
  const imageUrlBuilder = (await import('@sanity/image-url')).default;
  function urlFor(source) {
    return imageUrlBuilder(sanity).image(source);
  }
  const allProductsQuery = `
    *[_type == "product"] {
      ...,
      "categories": categories[] -> {title, "slug": slug.current},
    }`;

  const allProducts = await sanity.fetch(allProductsQuery);

  allProducts.forEach((product) => {
    product.productImgSrc = urlFor(product.defaultProductVariant.images[0]).width(450).url();
  });

  return { props: { products: allProducts } };
}

export default Products;
