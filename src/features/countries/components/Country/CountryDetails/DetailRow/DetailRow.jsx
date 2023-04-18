import styles from './DetailRow.module.css';

export default ({ label, value }) => (
  <div className={styles.row}>
    <div className={styles.label}>{label}</div>
    {value}
  </div>
);
