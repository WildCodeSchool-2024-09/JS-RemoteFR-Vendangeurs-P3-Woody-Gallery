import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/Login/LogInCreate.module.css";

export default function LogInCreate() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert(
        "Les mots de passe ne correspondent pas. Veuillez vérifier et réessayer.",
      );
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstname, lastname, email, password }),
        },
      );

      if (response.ok) {
        navigate("/login");
      } else if (response.status === 409) {
        alert("Cet email existe déjà");
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
      } else {
        alert("Une erreur est survenue durant la création du compte");
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
      alert("Une erreur est survenue durant la création du compte");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.logInCreate}>
        <NavLink className={styles.createAccount} to="/create-account">
          Créer un compte
        </NavLink>
        <NavLink className={styles.connexionCreate} to="/login">
          Connexion
        </NavLink>
        <div className={styles.formulaire}>
          <p className={styles.quest}>Vous n'avez pas encore un compte ?</p>
          <hr />
          <p className={styles.title}>Créer un compte</p>
          <form onSubmit={handleSubmit}>
            <input
              id="firstname"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              type="text"
              placeholder="Prénom"
              autoComplete="given-name"
            />
            <input
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              type="text"
              placeholder="Nom"
              autoComplete="family-name"
            />
            <input
              id="email-create"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <div>
              <input
                id="password-create"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={passwordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                autoComplete="new-password"
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
            <div>
              <input
                id="new-password-create"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                autoComplete="new-password"
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                onKeyDown={toggleConfirmPasswordVisibility}
                type="button"
                className={`${styles.eyes} material-symbols-outlined`}
              >
                {confirmPasswordVisible ? "visibility" : "visibility_off"}
              </button>
            </div>
            <button className={styles.confirm} type="submit">
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
