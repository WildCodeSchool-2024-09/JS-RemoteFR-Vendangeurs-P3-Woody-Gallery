import LogInConnect from "../components/LogInConnect";
import LogInCreate from "../components/LogInCreate";
import styles from "../styles/ConnectionPage.module.css";

export default function CreateAccountPage() {
  return (
    <>
      <section className={styles.logInContainer}>
        <h2>Connexion</h2>
        <div className={styles.formContainer}>
          <LogInCreate />
          <div className={styles.maskLogin}>
            <LogInConnect />
          </div>
        </div>
      </section>
    </>
  );
}
