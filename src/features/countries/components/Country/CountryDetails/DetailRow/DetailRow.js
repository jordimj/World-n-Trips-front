import styles from './DetailRow.module.css';

export default ({ label, value }) => (
  <div className={styles.detailsPanelRow}>
    <div className={styles.detailsPanelLabel}>{label}</div>
    {value}
  </div>
);
