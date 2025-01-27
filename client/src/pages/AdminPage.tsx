import { useState } from "react";
import AdminMobile from "../components/AdminMobile";
import styles from "../styles/AdminPage.module.css";

export default function AdminPage() {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useState(() => {
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <section className={styles.adminPage}>
      <h2>Panel administrateur</h2>
      {isMobile ? <AdminMobile /> : ""}
    </section>
  );
}
