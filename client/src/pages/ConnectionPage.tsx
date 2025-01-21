import LogInConnect from "../components/LogInConnect";
import styles from "../styles/ConnectionPage.module.css";

export default function ConnectionPage() {
  return (
    <>
      <section className={styles.logInContainer}>
        <h2>Connexion</h2>
        <LogInConnect />
      </section>
    </>
  );
}
