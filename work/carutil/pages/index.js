import styles from '../styles/Home.module.css'
import Modal_Congratuation from '../src/component/Modal_Congratuation'

import TopLogo from '../src/component/TopLogo'
import TopMenuBar from '../src/component/TopMenuBar'
import Footer from '../src/component/Footer'

export default function Home() {
  return (
    
    <div className={styles.container}>

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
