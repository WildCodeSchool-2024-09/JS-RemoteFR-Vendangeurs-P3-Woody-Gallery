import star from "/star.png";
import styles from "../../styles/Homepage/HomeReviews.module.css";
import ReviewCard from "./ReviewCard";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  firstname: string;
  lastname: string;
  comment: string;
  formattedDate: string;
  rating: number;
};

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewShow, setReviewsShow] = useState(1);

  useEffect(() => {
    const fetchReviews = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/ratings`)
        .then((response) => response.json())
        .then((data: Review[]) => {
          setReviews(data);
        });
    };

    fetchReviews();

    const intervalId = setInterval(fetchReviews, 2000);

    handleMediaQ();
    window.addEventListener("resize", handleMediaQ);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleMediaQ);
    };
  }, []);

  const handleMediaQ = () => {
    if (window.innerWidth >= 1280) {
      setReviewsShow(3);
    } else {
      setReviewsShow(1);
    }
  };

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

  const visibleReviews = [];
  for (let i = 0; i < reviewShow; i++) {
    visibleReviews.push(reviews[(reviewIndex + i) % reviews.length]);
  }

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
        <div className={styles.carouselContain}>
          {visibleReviews.length > 0 &&
            visibleReviews.map((review) => {
              if (!review) return null;
              const stars = Array.from(
                { length: review.rating },
                (_, index) => (
                  <img
                    key={`star-${review.id}-${index}`}
                    src={star}
                    alt="etoiles"
                  />
                ),
              );
              const starsEmpty = Array.from(
                { length: 5 - review.rating },
                (_, index) => (
                  <span
                    key={`star-empty-${review.id}-${index}`}
                    className="material-symbols-outlined"
                  >
                    star_outline
                  </span>
                ),
              );
              const firstLetter = review.lastname.charAt(0).toUpperCase();
              return (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  firstname={review.firstname}
                  firstLetter={firstLetter}
                  comment={review.comment}
                  formattedDate={review.formattedDate}
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
