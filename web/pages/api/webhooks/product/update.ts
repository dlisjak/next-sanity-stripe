import axios from 'axios';

export const updateProducts = async () => {
  try {
    const { data } = await axios.get('');
    return { status: 'Successful', apartments: data };
  } catch (err) {
    return { status: 'Error', err: err?.response?.data };
  }
};

export default async function handler(req, res) {
  const response = await updateProducts();

  return res.status(200).json(response);
}
