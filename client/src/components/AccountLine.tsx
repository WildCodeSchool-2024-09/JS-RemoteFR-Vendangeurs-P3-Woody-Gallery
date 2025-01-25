import { useState } from "react";
import styles from "../styles/AccountLine.module.css";

type AccountLineProps = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  onReload: () => void;
};

export default function AccountLine({
  firstname,
  lastname,
  email,
  phone_number,
  password,
  onReload,
}: AccountLineProps) {
  const [isClicked, setIsClicked] = useState(false);
  const user = sessionStorage.getItem("user");

  let value = "";

  if (firstname !== undefined) {
    value = firstname;
  } else if (lastname !== undefined) {
    value = lastname;
  } else if (email !== undefined) {
    value = email;
  } else if (phone_number !== undefined) {
    value = phone_number;
  } else if (password !== undefined) {
    value = "Modifier le mot de passe";
  }

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
      const fieldToUpdate = {
        firstname: firstname !== undefined ? data : undefined,
        lastname: lastname !== undefined ? data : undefined,
        email: email !== undefined ? data : undefined,
        phone_number: phone_number !== undefined ? data : undefined,
        password: password !== undefined ? data : undefined,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fieldToUpdate),
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
            <input
              type="text"
              defaultValue={value}
              onChange={(e) => setData(e.target.value)}
              className={styles.input}
            />
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
