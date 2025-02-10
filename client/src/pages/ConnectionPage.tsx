import LogInConnect from "../components/Login/LogInConnect";
import LogInCreate from "../components/Login/LogInCreate";
import styles from "../styles/Login/ConnectionPage.module.css";

export default function ConnectionPage() {
  return (
    <>
      <section className={styles.logInContainer}>
        <h2>Connexion</h2>
        <div className={styles.formContainer}>
          <div className={styles.maskLogin}>
            <LogInCreate />
          </div>
          <LogInConnect />
        </div>
      </section>
    </>
  );
}
