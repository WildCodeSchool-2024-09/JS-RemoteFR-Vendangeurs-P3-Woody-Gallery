import styles from "../../styles/Homepage/ReviewCard.module.css";

type Review = {
  id: number;
  firstname: string;
  firstLetter: string;
  comment: string;
  formattedDate: string;
  starsEmpty: JSX.Element[];
  star: JSX.Element[];
};

export default function ReviewCard({
  id,
  firstname,
  firstLetter,
  comment,
  formattedDate,
  starsEmpty,
  star,
}: Review) {
  return (
    <>
      <article key={id} className={styles.reviewCard}>
        <h4>
          {firstname} {firstLetter}
        </h4>
        <div>
          {star}
          {starsEmpty}
        </div>
        <p className={styles.comment}>{comment}</p>
        <p className={styles.date}>{formattedDate}</p>
      </article>
    </>
  );
}
