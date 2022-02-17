export const getProduct = async (productId) => {
  try {
    const sanity = (await import('../../../utils/sanity/client')).default;
    const productQuery = `
      *[_type == "product" && $productId == _id][0] { 
        ...,
      }`;
    const product = await sanity.fetch(productQuery, { productId: productId });

    return { status: 'Successful', product };
  } catch (err) {
    return { status: 'Error', err: err?.response?.data };
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { productId } = req.query;
    const response = await getProduct(productId);

    return res.status(200).json(response);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
