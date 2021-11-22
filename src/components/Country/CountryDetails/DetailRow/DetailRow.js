import styles from './DetailRow.module.css';

export const APPENDIX_TYPES = {
    MINS: 'mins',
    KM: 'km',
    KM_PER_DAY: 'km/day',
    RIDES: 'rides',
    DAYS: 'days'
};

export default ({ label, value, appendix }) => (
  <div className={styles.detailsPanelRow}>
    <div className={styles.detailsPanelLabel}>{label}</div>
    {value instanceof Array
      ? value.map(({ name, symbol }) => `${name} (${symbol})`).join(', ')
      : appendix ? `${value} ${appendix}` : value}
  </div>
);
