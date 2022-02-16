import React from 'react';

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Products;
