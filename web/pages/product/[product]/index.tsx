import Image from 'next/image';
import Link from 'next/link';

const Category = ({ product }) => {
  console.log(product);
  return (
    <div>
      <h1>{product.title}</h1>
      <div className="flex">
        <Image src={product.productImgSrc} width={450} height={450} />
        <div className="flex">
          {(product.tags || []).map((tag) => (
            <span className="mr-2" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex">
          {(product.categories || []).map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <a>
                <span className="mr-2">{category.title}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const sanity = (await import('../../../utils/sanity/client')).default;
  const productsQuery = `
    *[_type == "product"] { 
      "slug": slug.current,
    }`;
  const products = await sanity.fetch(productsQuery);
  const paths = products.map((product) => ({
    params: { product: product.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const sanity = (await import('../../../utils/sanity/client')).default;
  const imageUrlBuilder = (await import('@sanity/image-url')).default;
  function urlFor(source) {
    return imageUrlBuilder(sanity).image(source);
  }
  const productQuery = `
    *[_type == "product" && $slug == slug.current][0] {
      ...,
      "categories": categories[] -> {title, "slug": slug.current},
    }`;

  const product = await sanity.fetch(productQuery, { slug: params.product });
  if (product) {
    product.productImgSrc = urlFor(product.defaultProductVariant.images[0]).width(450).url();
  }

  return { props: { product } };
}

export default Category;
