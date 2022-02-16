import Link from 'next/link';
import Image from 'next/image';

const Index = ({ featuredProducts }) => {
  console.log(featuredProducts);
  return (
    <div>
      <h1>Home</h1>

      <div>
        <h2>Featured products</h2>
        <div className="flex justify-evenly">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id}>
              <a className="flex justify-center flex-col text-center border-2">
                <h3 className="my-4">{product.title}</h3>
                <Image src={product.productImgSrc} width={250} height={250} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const sanity = (await import('../utils/sanity/client')).default;
  const imageUrlBuilder = (await import('@sanity/image-url')).default;
  function urlFor(source) {
    return imageUrlBuilder(sanity).image(source);
  }
  const featuredProductsQuery = `
    *[_type == "product" && isFeatured == true] {
      ...,
      "categories": categories[] -> {title, "slug": slug.current},
    }`;

  const featuredProducts = await sanity.fetch(featuredProductsQuery);

  featuredProducts.forEach((product) => {
    product.productImgSrc = urlFor(product.defaultProductVariant.images[0]).width(450).url();
  });

  return { props: { featuredProducts } };
}

export default Index;
