import Navbar from '../components/Navbar';
import '../styles/main.css';

const MyApp = ({ Component, pageProps, router }) => {
  const { route } = router;

  return (
    <>
      <Navbar />
      <Component {...pageProps} key={route} />
    </>
  );
};

export default MyApp;
