import styles from "../styles/ArticleDetails.module.css";

type ArticleDetailsProps = {
  name: string;
  price: string;
  format: string;
  frameType: string;
  image: string;
};

export default function ArticleDetails({
  name,
  price,
  format,
  frameType,
  image,
}: ArticleDetailsProps) {
  return (
    <div className={styles.articleDetails}>
      {/* Image de l'article */}
      <img src={image} alt={name} className={styles.image} />

      {/* Barre décorative sous l'image */}
      <div className={styles.thinDecorativeBar} />

      {/* Détails de l'article */}
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.price}>Prix : {price}</p>
      <p className={styles.format}>Format : {format}</p>
      <p className={styles.frameType}>Type de cadre : {frameType}</p>
    </div>
  );
}
