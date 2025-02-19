import { useRef } from "react";
import { NavLink } from "react-router-dom";
import musicSnake from "../assets/audio/Serpent.mp3";
import music from "../assets/audio/ToyStory.mp3";
import styles from "../styles/PageNotFound.module.css";

export default function PageNotFound() {
  const audioRef = useRef(new Audio(music));
  const audioSnakeRef = useRef(new Audio(musicSnake));

  return (
    <section className={styles.pageNotFound}>
      <section className={styles.title}>
        <p id={styles.titleSilver}>404 Page</p>
        <p id={styles.titleGold}>not found</p>
      </section>
      <section className={styles.text}>
        <p>Vous vous êtes perdu dans un lieu que même Woody n'a pas visité !</p>
        <p>
          Si il y a un serpent{" "}
          <span
            onClick={() => audioSnakeRef.current.play()}
            onKeyDown={() => audioSnakeRef.current.play()}
            className={styles.snake}
          >
            🐍
          </span>{" "}
          dans votre botte, cliquez ci-dessous
        </p>
        <button
          id={styles.errorButton}
          type="button"
          onClick={() => audioRef.current.play()}
        >
          <NavLink to="/">Vers l'infini et au delà ! 🚀</NavLink>
        </button>
      </section>
    </section>
  );
}
