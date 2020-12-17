import styles from './DetailRow.module.css';

export default ({ label, value }) => (
  <div className={styles.details_panel_row}>
    <div className={styles.details_panel_label}>{label}</div>
    <div className={styles.details_panel_value}>
      {value instanceof Array
        ? value.map(({ name, symbol }) => `${name} (${symbol})`).join(', ')
        : value}
    </div>
  </div>
);
