import Head from 'next/head'
import Signup from '../src/component/Signup'

import TopLogo from '../src/component/TopLogo'
import TopMenuBar from '../src/component/TopMenuBar'
import Footer from '../src/component/Footer'
import styles from '../styles/Home.module.css'
import Modal_Congratuation from '../src/component/Modal_Congratuation'
import Signin from '../src/component/SignIn'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dash Board</title>
        <meta name="description" content="nextjs interlock with spring-boot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopLogo />
      <TopMenuBar />

      <main className={styles.main}>
        {/* 
        Spring boot server 의 경로를 호출하여
        받은 자원들을 표현할 컴포넌트 호출
        
      */}
        {/* <span>main body contents</span> */}
        {/* <GetEmployeeListWithPaging elist={elist} /> */}

        {/* <Modal_Congratuation /> */}
        {/* <Signup /> */}
        <Signin />
        
      </main>

      <Footer />

    </div>
  )
}
