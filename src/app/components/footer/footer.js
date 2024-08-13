import styles from './footer.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer
            id={styles.footer}
            style={{
                backgroundImage: 'url(/congruent_outline.png)'
            }}
        >
            <div className={styles.footerCol}>
                <h3> <IoLocationSharp /> Адрес</h3>
                <p>София - Бусманци</p>
            </div>

            <div className={styles.footerCol}>
                <h3> <BsTelephoneFill /> Телефон</h3>
                <p>0876 43 44 64</p>
                <p>0899 43 44 61</p>
                <p>Григор Николов</p>
            </div>

            <div className={styles.footerCol}>
                <h3> <MdOutlineEmail /> Email</h3>
                <p>
                    <a href="mailto:multistrati@abv.bg">multistrati@abv.bg</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;