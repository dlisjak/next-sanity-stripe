import axios from 'axios';

export const updateProducts = async () => {
  try {
    const { data } = await axios.get('');
    console.log('This is the API console log: if Successful')
    return { status: 'Successful', product: data };
  } catch (err) {
    console.log('This is the API console log: if Fail')
    return { status: 'Error', err: err?.response?.data };
  }
};

export default async function handler(req, res) {
  const response = await updateProducts();

  return res.status(200).json(response);
}
