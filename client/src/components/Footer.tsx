import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <article>
        <h3>À propos</h3>
        <p>
          Passionné de voyage et de photographie. Je partage avec vous les
          moments que j’ai pu capturer avec mon appareil
        </p>
      </article>
      <article>
        <h3>Shop</h3>
        <ul>
          <li>Collection Tokyo Modern</li>
          <li>Collection Tokyo Traditionnel</li>
          <li>Collection Munich</li>
          <li>Collection Alpes Françaises</li>
        </ul>
      </article>
      <article>
        <h3>Suivez moi</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com">Instagram</a>
          </li>
          <li>
            <a href="https://www.twitter.com">Twitter / X</a>
          </li>
          <li>
            <a href="https://www.pinterest.com">Pinterest</a>
          </li>
        </ul>
      </article>
      <article>
        <h3>Contacts</h3>
        <ul>
          <li>woody@woody_gallery.com</li>
          <li>02.25.02.25.02</li>
        </ul>
      </article>
      <ul className={styles.credit}>
        <li>©2024</li>
        <li>Mateusz Plebanek - Jérémy Perez - Flavien Rousseau</li>
      </ul>
    </footer>
  );
}
