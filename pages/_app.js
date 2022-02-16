
import '../styles/main.css';

const MyApp = ({ Component, pageProps, router }) => {
  const { route } = router;

  return (
    <Component {...pageProps} key={route} />
  );
};

export default MyApp;
