import { useState } from "react";
import star from "/star.png";
import star_empty from "/star_empty.png";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/AddReview.module.css";

export default function AddReview() {
  const [modal, setModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [noVoted, setNoVoted] = useState<boolean>(true);

  const { user } = useAuth();

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Veuillez ajouter une note");
      return;
    }

    if (comment.length === 0) {
      alert("Veuillez ajouter un commentaire"); // AJOUTER UNE LIMITE DE CHARACTERE A RENSEIGNER OU BLOQUER LE SURPLUS DE CHARACTERE
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ratings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment, userId: user?.id }),
        },
      );

      if (response.ok) {
        setModal(false);
        setNoVoted(false);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'avis :", error);
      alert("Une érreur s'est produite durant l'ajout de votre avis");
    }
  };

  return (
    <>
      {noVoted && (
        <div
          className={styles.addReview}
          onClick={handleModal}
          onKeyDown={handleModal}
        >
          <h3>Donnez nous votre avis</h3>
          <span className="material-symbols-outlined">add_comment</span>
        </div>
      )}
      {modal && (
        <section
          className={styles.reviewModalContainer}
          onClick={handleModal}
          onKeyDown={handleModal}
        >
          <div
            className={styles.absoluteModal}
            onClick={handleModal}
            onKeyDown={handleModal}
          >
            <h2>Donnez votre avis</h2>
            <form onSubmit={handleSubmit}>
              <span
                className={`${styles.closeReviewModal} material-symbols-outlined`}
                onClick={handleModal}
                onKeyDown={handleModal}
              >
                close
              </span>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Votre avis"
                rows={4}
                cols={50}
              />
              <div className={styles.ratingContainer}>
                {[...Array(5)].map((_, index: number) => (
                  <img
                    key={`client_rating_${index}_${Math.random()}`} // CHANGER LA COULEUR DE STARS EN BLANC
                    src={index < rating ? star : star_empty}
                    alt="étoiles"
                    className="material-symbols-outlined"
                    onClick={() => handleRating(index)}
                    onKeyDown={() => handleRating(index)}
                    onChange={() => setRating(index)}
                  />
                ))}
              </div>
              <button type="submit">Ajoutez votre avis</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
