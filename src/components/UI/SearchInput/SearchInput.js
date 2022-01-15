import SearchRounded from '@mui/icons-material/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({ ...rest }) => (
  <div className={styles.searchInput}>
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  </div>
);

export default SearchInput;
