import styles from "./Footer.module.css";

// Icons
import facebook from "../assets/icons/social_media/facebook.svg";
import instagram from "../assets/icons/social_media/instagram.svg";
import linkedin from "../assets/icons/social_media/linkedin.svg";
import youtube from "../assets/icons/social_media/youtube.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["social-media"]}>
        <p>Nossas redes sociais</p>
        <ul>
          <li>
            <a href="https://facebook.com">
              <img src={facebook} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com">
              <img src={instagram} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com">
              <img src={linkedin} alt="Linkedin" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com">
              <img src={youtube} alt="YouTube" />
            </a>
          </li>
        </ul>
      </div>
      <p>MID.IA © 2024. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
