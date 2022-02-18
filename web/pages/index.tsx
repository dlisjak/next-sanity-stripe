import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';

const Index = ({ featuredProducts }) => {
  return (
    <div>
      <h1>Home</h1>

      <ProductGrid title="Izpostavljeno">
        {featuredProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </ProductGrid>
    </div>
  );
};

export async function getStaticProps() {
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
