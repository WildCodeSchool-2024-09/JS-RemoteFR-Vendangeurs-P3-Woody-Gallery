import { useState } from "react";
import styles from "../styles/AccountLine.module.css";

type AccountLineProps = {
  value: string;
  valueName: string;
  onReload: () => void;
};

export default function AccountLine({
  value,
  valueName,
  onReload,
}: AccountLineProps) {
  const [isClicked, setIsClicked] = useState(false);
  const user = sessionStorage.getItem("user");

  const [data, setData] = useState(value);

  const toggleClick = () => {
    setIsClicked(!isClicked);
    setData(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (data === value) {
      toggleClick();
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [valueName]: data }),
        },
      );
      if (response.ok) {
        toggleClick();
        onReload();
      }
    } catch (error) {
      console.error("Erreur lors de la modification du compte:", error);
      alert("Une erreur est survenue durant la modification du compte");
    }
  };

  return (
    <section className={styles.account}>
      <section className={styles.lines}>
        <div className={styles.container}>
          {isClicked ? (
            <>
              {valueName === "password" ? (
                <input
                  type="text"
                  placeholder="Ancien mot de passe"
                  className={styles.input}
                />
              ) : (
                <></>
              )}
              <input
                type="text"
                defaultValue={valueName === "password" ? "" : value}
                placeholder={
                  valueName === "password" ? "Nouveau mot de passe" : valueName
                }
                onChange={(e) => setData(e.target.value)}
                className={styles.input}
              />
            </>
          ) : (
            <p>{value}</p>
          )}
        </div>
        <button
          type="button"
          className={styles.editButton}
          onClick={isClicked ? handleSubmit : toggleClick}
        >
          <span className={`material-symbols-outlined ${styles.editIcon}`}>
            {isClicked ? "check" : "edit_square"}
          </span>
        </button>
      </section>
    </section>
  );
}
