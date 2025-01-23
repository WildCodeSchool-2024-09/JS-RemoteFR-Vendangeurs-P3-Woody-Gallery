import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/AccountLine.module.css";

type AccountLineProps = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
};

export default function AccountLine({
  firstname,
  lastname,
  email,
  phone_number,
  password,
}: AccountLineProps) {
  const { user } = useAuth();
  const [data, setData] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  let value = "";
  let route = "";

  if (firstname !== undefined) {
    value = firstname;
    route = "firstname";
  } else if (lastname !== undefined) {
    value = lastname;
    route = "lastname";
  } else if (email !== undefined) {
    value = email;
    route = "email";
  } else if (phone_number !== undefined) {
    value = phone_number;
    route = "phonenumber";
  } else if (password !== undefined) {
    value = "Modifier le mot de passe";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const fieldToUpdate = {
        firstname: firstname !== undefined ? data : undefined,
        lastname: lastname !== undefined ? data : undefined,
        email: email !== undefined ? data : undefined,
        phone_number: phone_number !== undefined ? data : undefined,
        password: password !== undefined ? data : undefined,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}/${route}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fieldToUpdate),
        },
      );
      if (response.ok) {
        toggleClick();
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
          <p>{value}</p>
        </div>
        <button
          type="button"
          className={styles.editButton}
          onClick={toggleClick}
        >
          <span className={`material-symbols-outlined ${styles.editIcon}`}>
            edit_square
          </span>
        </button>
        {isClicked && (
          <section className={styles.modal}>
            <input
              type="text"
              defaultValue={value}
              onChange={(e) => setData(e.target.value)}
              className={styles.input}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.modifyButton}
            >
              <span className={`material-symbols-outlined ${styles.check}`}>
                check
              </span>
            </button>
          </section>
        )}
      </section>
    </section>
  );
}
