import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Login/LogInCreate.module.css";

export default function LogInConnect() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loggedUser = await login(email, password);

      if (loggedUser) {
        navigate("/");
      }
    } catch {
      alert("Mauvais identifiants");
    }
  };

  const handleGLHF = () => {
    alert("En cours de développement :) Revenez plus tard");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.logInCreate}>
        <NavLink className={styles.createAccountConnect} to="/create-account">
          Créer un compte
        </NavLink>
        <NavLink className={styles.connexion} to="/login">
          Connexion
        </NavLink>
        <div className={styles.formulaire}>
          <p className={styles.quest}>Vous avez déjà un compte ?</p>
          <hr />
          <p className={styles.title}>Connexion</p>
          <form onSubmit={handleSubmit}>
            <input
              id="email-connect"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <div>
              <input
                id="password-connect"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={passwordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                autoComplete="current-password"
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
            <button className={styles.confirm} type="submit">
              Connexion
            </button>
          </form>
          <a
            onClick={handleGLHF}
            className={styles.forgotPassword}
            href="/login"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </>
  );
}
