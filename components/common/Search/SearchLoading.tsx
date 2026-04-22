import styles from "./Search.module.scss";

export default function SearchLoading() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchLoading}>
        <span className={styles.searchSpinner} />
        <span>Loading search…</span>
      </div>
    </div>
  );
}
