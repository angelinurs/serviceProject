import '../styles/globals.css'

import Footer from '../src/component/Footer';
import TopLogo from '../src/component/TopLogo';
import TopMenuBar from '../src/component/TopMenuBar';
// persist 적용 전 redux 만 적용했을때,
// import wrapper from '../lib/store/configStore';

// persist 적용 후 ,
import wrapper from '../lib/persist-store/persistStore';


function MyApp({ Component, pageProps }) { 

  return (
    <>        
          <TopLogo />
          <TopMenuBar />

          <Component {...pageProps} />          

          <Footer />
    </>
  ); 
}

export default wrapper.withRedux(MyApp); 
