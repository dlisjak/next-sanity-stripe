import Navbar from '../components/Navbar';
import '../styles/main.css';

const MyApp = ({ Component, pageProps, router }) => {
  const { route } = router;

  return (
    <>
      <Navbar />
      <div className='container mx-auto'>
        <Component {...pageProps} key={route} />
      </div>
    </>
  );
};

export default MyApp;
