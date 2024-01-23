import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const Preloader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={`${styles.cloud} ${styles.front}`}>
              <span className={`${styles.left} ${styles.front}`}></span>
              <span className={styles.rightFront}></span>
            </div>
            <span className={`${styles.sun} ${styles.sunshine}`}></span>
            <span className={styles.sun}></span>
            <div className={`${styles.cloud} ${styles.back}`}>
              <span className={styles.leftBack}></span>
              <span className={styles.rightBack}></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
