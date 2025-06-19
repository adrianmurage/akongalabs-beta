import styles from "./Stats.module.css";

const Stats = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 Stats Page</h1>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <p className={styles.description}>
            This is a test stats page to verify routing works correctly!
          </p>
          <p className={styles.meta}>
            You are at: <strong>/app/stats</strong>
          </p>
          <p className={styles.meta}>
            URL should show: <strong>http://localhost:3001/app/stats</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
