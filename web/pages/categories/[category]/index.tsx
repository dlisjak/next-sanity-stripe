import Image from 'next/image';
import Link from 'next/link';

const Category = ({ category, products }) => {
  console.log(products);
  return (
    <div>
      <h1>{category.title}</h1>
      <div className="flex">
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

export async function getStaticPaths() {
  const sanity = (await import('../../../utils/sanity/client')).default;
  const categoryQuery = `*[_type == "category"] { title, "slug": slug.current }`;
  const categories = await sanity.fetch(categoryQuery);
  const paths = categories.map((category) => ({
    params: { category: category.slug, title: category.title },
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

  const categoryQuery = `
    *[_type == "category" && $slug == slug.current][0] { 
      title,
      description,
      "slug": slug.current,
    }`;

  const productQuery = `
    *[_type == "product" && $category in categories[]->slug.current] {
      ...,
      "categories": categories[] -> {title, "slug": slug.current},
    }`;

  const category = await sanity.fetch(categoryQuery, { slug: params.category });
  const products = await sanity.fetch(productQuery, { category: params.category });
  products.forEach(
    (product) =>
      (product.productImgSrc = urlFor(product.defaultProductVariant.images[0]).width(250).url())
  );

  return { props: { products, category: category } };
}

export default Category;
