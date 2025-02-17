import LogInConnect from "../components/Login/LogInConnect";
import LogInCreate from "../components/Login/LogInCreate";
import styles from "../styles/Login/ConnectionPage.module.css";

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
