import Link from 'next/link';

const Category = ({ categories }) => {
  console.log(categories);
  return (
    <div>
      <h1>Categories</h1>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <Link href={`/categories/${category.slug}`} key={category.slug}>
            <a className="flex justify-center flex-col text-center border-2 w-40 h-20">
              <h3 className="my-4">{category.title}</h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const sanity = (await import('../../utils/sanity/client')).default;

  const categoriesQuery = `
    *[_type == "category"] { 
      title,
      description,
      "slug": slug.current,
    }`;

  const categories = await sanity.fetch(categoriesQuery);

  return { props: { categories } };
}

export default Category;
