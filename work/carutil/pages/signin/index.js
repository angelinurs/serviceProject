import Footer from '../../src/component/Footer';
import Signin from '../../src/component/Signin';
import TopLogo from '../../src/component/TopLogo';
import TopMenuBar from '../../src/component/TopMenuBar';
import styles from '../../styles/Home.module.css'

const signin = () => {
    return (
        <div className={styles.main} >

            <Signin />
            
        </div>
    );
}

export default signin;