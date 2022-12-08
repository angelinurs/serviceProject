import Footer from "../../src/component/Footer";
import Signup from "../../src/component/Signup";
import TopLogo from "../../src/component/TopLogo";
import TopMenuBar from "../../src/component/TopMenuBar";
import styles from '../../styles/Home.module.css'

const signup = () => {

    return(
        <div className={styles.main}>

            <Signup />
        </div>
    )
};

export default signup;