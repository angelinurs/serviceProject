import Footer from '../src/component/Footer';
import Header from '../src/component/Header';
import TopLogo from '../src/component/TopLogo';
import TopMenuBar from '../src/component/TopMenuBar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    // <Component {...pageProps} />
    <>
      <Header />
      <TopLogo />
      <TopMenuBar />

      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp
