import LogInConnect from "../components/LogInConnect";
import LogInCreate from "../components/LogInCreate";
import styles from "../styles/ConnectionPage.module.css";

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
