import axios from 'axios';

export const updateProducts = async () => {
  try {
    const { data } = await axios.get('');
    return { status: 'Successful', product: data };
  } catch (err) {
    return { status: 'Error', err: err?.response?.data };
  }
};

export default async function handler(req, res) {
  axios.post('https://c981-86-58-45-210.eu.ngrok.io', req)
  // const response = await updateProducts();


  return res.status(200).json(res);
}
