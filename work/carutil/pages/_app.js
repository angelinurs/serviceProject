import '../styles/globals.css'

import Footer from '../src/component/Footer';
import TopLogo from '../src/component/TopLogo';
import TopMenuBar from '../src/component/TopMenuBar';
// persist 적용 전 redux 만 적용했을때,
// import { wrapper } from '../lib/store/configStore';

// persist 적용 후 ,
// import { makeStore, wrapper } from '../lib/persist/persist-store/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { Provider, useDispatch, useSelector, useStore } from 'react-redux';
import { wrapper } from '../lib/store/configStore';


function MyApp({ Component, pageProps }) { 

    // const store =  useStore((state)=> state);
    // const store = makeStore();
    // const persistor = persistStore( store );

    // const user = useSelector( ( {account}) => account.user );
    // const chk = useSelector( ( {account}) => account.chk );

    // console.log( '_app.js -> user.id state value : ' + user );
    // console.log( '_app.js -> chk state value : ' + chk );   

  
  // return process.browser? (
  //   <>
  //       <PersistGate persistor={persistor} loading={<>loading...</>}>
  //         <TopLogo />
  //         <TopMenuBar />

  //         <Component {...pageProps} />          

  //         <Footer />
  //       </PersistGate>
  //   </>
  // ) : (
  //   <>
  //       <PersistGate persistor={store} loading={<>loading...</>}>
  //         <TopLogo />
  //         <TopMenuBar />

  //         <Component {...pageProps} />          

  //         <Footer />
  //       </PersistGate>
  //   </>
  // ); 
  return (
    <>
        {/* <PersistGate persistor={store} loading={<>loading...</>}> */}
          <TopLogo />
          <TopMenuBar />

          <Component {...pageProps} />          

          <Footer />
        {/* </PersistGate> */}
    </>
  ); 
}
// export default wrapper.withRedux(MyApp); 
export default wrapper.withRedux(MyApp); 
