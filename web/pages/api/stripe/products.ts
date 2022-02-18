export const getProducts = async () => {
  try {
    const stripe = require('stripe')('sk_test_nqsJVJvs0mIQM3Pk8N0bERE4');

    const products = await stripe.products.list({ limit: 100 });

    return { status: 'Successful', products };
  } catch (err) {
    return { status: 'Error', err: err?.response?.data };
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await getProducts();

    return res.status(200).json(response);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
