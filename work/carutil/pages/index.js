import Head from 'next/head'
import Signup from '../src/component/Signup'

import styles from '../styles/Home.module.css'
import Modal_Congratuation from '../src/component/Modal_Congratuation'


import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Signin from './Signin'


export default function Home() {
  const [chk, setChk] = useState(false);
  const [user, setUser] = useState( {} );

  useEffect( () =>{

    if( getCookie('chk') == 1 ) {
      const data = JSON.parse( getCookie( 'user' ) );
      setUser( data );
      setChk( true );
    } else {
      setChk( false );
    }

  },[]);

  console.log( "chk = " + chk );

  return (
    <div className={styles.container}>
      <Head>
        <title>Dash Board</title>
        <meta name="description" content="nextjs interlock with spring-boot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* 
        Spring boot server 의 경로를 호출하여
        받은 자원들을 표현할 컴포넌트 호출
        
      */}
        {/* <span>main body contents</span> */}
        {/* <GetEmployeeListWithPaging elist={elist} /> */}

        {/* <Modal_Congratuation /> */}

        <h6> main body </h6>


        
        
      </main>

    </div>
  )
}
