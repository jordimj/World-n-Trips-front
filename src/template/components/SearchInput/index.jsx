import SearchRounded from '@mui/icons-material/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({ ...rest }) => (
  <div className={styles.searchInput}>
    <SearchRounded color="inherit" />
    <input className={styles.input} {...rest} />
  </div>
);

export default SearchInput;
