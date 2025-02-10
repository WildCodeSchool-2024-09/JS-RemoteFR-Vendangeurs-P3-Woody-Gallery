import { useState } from "react";
import styles from "../../styles/UserAccount/AccountLine.module.css";
import AccountDeleteModal from "./AccountDeleteModal";

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
  const [oldPassword, setOldPassword] = useState("");
  const [data, setData] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState(false);
  const user = sessionStorage.getItem("user");

  const toggleClick = () => {
    setIsClicked(!isClicked);
    setData(value);
    setOldPassword("");
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
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
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
      } else {
        setError("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur lors de la modification du compte:", error);
      setError("Une erreur est survenue.");
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!oldPassword || !data) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user}/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword: oldPassword, newPassword: data }),
        },
      );
      if (response.ok) {
        alert("Mot de passe modifié avec succès!");
        toggleClick();
        onReload();
      } else if (response.status === 401) {
        const errorData = await response.json();
        alert(errorData.message);
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.message);
      } else {
        setError("Échec de la mise à jour du mot de passe.");
      }
    } catch (err) {
      console.error("Erreur lors de la modification du mot de passe:", error);
      setError("Une erreur est survenue.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.ok) {
        alert("Votre compte a été supprimé.");
        sessionStorage.clear();
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la suppression du compte.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du compte:", err);
    }
  };

  return (
    <section className={styles.account}>
      {modalDelete && (
        <AccountDeleteModal
          handleCloseModalDelete={() => setModalDelete(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
      <section className={styles.lines}>
        <div className={styles.container}>
          {isClicked ? (
            <form
              onSubmit={
                valueName === "password" ? handleSubmitPassword : handleSubmit
              }
              className={styles.form}
            >
              {valueName === "password" ? (
                <section className={styles.passwords}>
                  <label className={styles.labels}>
                    Ancien mot de passe :
                    <input
                      name="oldPassword"
                      type="password"
                      placeholder="Ancien mot de passe"
                      onChange={(e) => setOldPassword(e.target.value)}
                      className={`${styles.input}  ${styles.oldPwdInput}`}
                    />
                  </label>

                  <label className={styles.labels}>
                    Nouveau mot de passe :
                    <div className={styles.passwordVisibility}>
                      <input
                        name="newPassword"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Nouveau mot de passe"
                        onChange={(e) => setData(e.target.value)}
                        className={`${styles.input} ${styles.newPwdInput}`}
                      />
                      <button
                        onClick={togglePasswordVisibility}
                        onKeyDown={togglePasswordVisibility}
                        type="button"
                        className={`${styles.eyes} material-symbols-outlined`}
                      >
                        {passwordVisible ? "visibility" : "visibility_off"}
                      </button>
                    </div>
                  </label>
                </section>
              ) : (
                <input
                  type={
                    valueName === "email"
                      ? "email"
                      : valueName === "phone_number"
                        ? "tel"
                        : "text"
                  }
                  defaultValue={value}
                  placeholder={valueName}
                  onChange={(e) => setData(e.target.value)}
                  className={styles.input}
                />
              )}
              <button
                type="submit"
                className={`${styles.editButton} ${isClicked ? styles.colorButton : ""}`}
              >
                <span
                  className={`material-symbols-outlined ${styles.editIcon}`}
                >
                  check
                </span>
                <span id={styles.desktopValidate}>Valider</span>
              </button>
            </form>
          ) : (
            <p id={styles.lineName}>{value}</p>
          )}
        </div>
        {!isClicked &&
          (valueName === "deleteAccount" ? (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => setModalDelete(true)}
            >
              <span
                className={`material-symbols-outlined ${styles.deleteIcon}`}
              >
                edit_square
              </span>
              <span id={styles.desktopDeleteAccount}>Supprimer</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.editButton}
              onClick={toggleClick}
            >
              <span className={`material-symbols-outlined ${styles.editIcon}`}>
                edit_square
              </span>
              <span id={styles.desktopModify}>Modifier</span>
            </button>
          ))}
      </section>
    </section>
  );
}
