import star from "/star.png";
import styles from "../styles/HomeReviews.module.css";

export default function HomeReviews() {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(<img key={i} src={star} alt={`${stars}${i}`} />);
  }

  return (
    <section className={styles.reviews}>
      <h2>Reviews</h2>
      <div className={styles.carousel}>
        <span className={`${styles.prev} material-symbols-outlined`}>
          arrow_forward_ios
        </span>
        <article>
          <h4>Antony R</h4>
          <div>{stars}</div>
          <p className={styles.comment}>
            Les tableaux sont vraiment cool ! Je peux enfin habiller mes murs
            avec de magnifique photos
          </p>
          <p className={styles.date}>Il y'a 5 heures</p>
        </article>
        <span className={`${styles.next} material-symbols-outlined`}>
          arrow_forward_ios
        </span>
      </div>
    </section>
  );
}
