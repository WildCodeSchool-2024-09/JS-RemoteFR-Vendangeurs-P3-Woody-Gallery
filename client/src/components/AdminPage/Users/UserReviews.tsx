import styles from "../../../styles/AdminPage/Users/UserModal.module.css";

type UserReviewsProps = {
  rating: number;
  comment: string;
  date: string;
};

type UserProps = {
  ratings: UserReviewsProps;
};

export default function UserReviews({ ratings }: UserProps) {
  return (
    <ul>
      {ratings.comment ? (
        <>
          <li className={styles.comment}>
            Commentaire : <p>{ratings.comment}</p>
          </li>
          <li>
            Note :{" "}
            <p className={ratings.rating < 3 ? styles.badReview : ""}>
              {ratings.rating}/5
            </p>
          </li>
          <li>
            Date : <p>{ratings.date}</p>
          </li>
        </>
      ) : (
        <li className={styles.noReview}>Aucun commentaire enregistré</li>
      )}
    </ul>
  );
}
