import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Loader}>
        <svg className={styles.CircleOuter} viewBox="0 0 86 86">
          <circle className={styles.Back} cx="43" cy="43" r="40"></circle>
          <circle className={styles.Front} cx="43" cy="43" r="40"></circle>
          <circle className={styles.New} cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className={styles.CircleMiddle} viewBox="0 0 60 60">
          <circle className={styles.Back} cx="30" cy="30" r="27"></circle>
          <circle className={styles.Front} cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className={styles.CircleInner} viewBox="0 0 34 34">
          <circle className={styles.Back} cx="17" cy="17" r="14"></circle>
          <circle className={styles.Front} cx="17" cy="17" r="14"></circle>
        </svg>
        <div className={styles.Text} data-text="Searching"></div>
      </div>
    </div>
  );
};
