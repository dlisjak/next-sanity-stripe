import '../styles/main.css';

const MyApp = ({ Component, pageProps, router }) => {
  const route = router.route;

  return (
    <Component {...pageProps} key={route} />
  );
};

export default MyApp;
