import star from "/star.png";
import styles from "../styles/HomeReviews.module.css";
import ReviewCard from "./ReviewCard";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  firstname: string;
  lastname: string;
  comment: string;
  date: string;
  rating: number;
  starsEmpty: JSX.Element[];
  star: JSX.Element[];
};

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ratings`)
      .then((response) => response.json())
      .then((data: Review[]) => {
        setReviews(data);
      });
  }, []);

  const HandlePrev = () => {
    setReviewIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : reviews.length - 1,
    );
  };

  const HandleNext = () => {
    setReviewIndex((prevIndex) =>
      prevIndex < reviews.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const reviewSelect = reviews.length > 0 ? reviews[reviewIndex].id : null;

  return (
    <section className={styles.reviews}>
      <h2>Reviews</h2>
      <div className={styles.carousel}>
        <span
          onClick={HandlePrev}
          onKeyDown={HandlePrev}
          className={`${styles.prev} material-symbols-outlined`}
        >
          arrow_forward_ios
        </span>
        <span
          onClick={HandleNext}
          onKeyDown={HandleNext}
          className={`${styles.next} material-symbols-outlined`}
        >
          arrow_forward_ios
        </span>
        <div>
          {reviews.length > 0 &&
            reviews
              .filter((select) => select.id === reviewSelect)
              .map((review) => {
                const stars = Array(review.rating).fill(
                  <img src={star} alt="etoiles" />,
                );
                const starsEmpty = Array(5 - review.rating).fill(
                  <span className="material-symbols-outlined">
                    star_outline
                  </span>,
                );
                const firstLetter = review.lastname.charAt(0).toUpperCase();
                return (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    firstname={review.firstname}
                    firstLetter={firstLetter}
                    comment={review.comment}
                    date={review.date}
                    starsEmpty={starsEmpty}
                    star={stars}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
}
