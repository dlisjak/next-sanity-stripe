import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ProductGrid title="All products">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </ProductGrid>
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
