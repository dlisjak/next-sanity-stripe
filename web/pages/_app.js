import Navbar from '../components/Navbar';

import { CartProvider } from "../context/cart";

import '../styles/main.css';

const MyApp = ({ Component, pageProps, router }) => {
  const { route } = router;

  return (
    <CartProvider>
      <Navbar />
      <div className='container mx-auto'>
        <Component {...pageProps} key={route} />
      </div>
    </CartProvider>
  );
};

export default MyApp;
