import { Box } from '@mui/material';
import Settings from '../Settings';
import styles from './Toolbar.module.css';

function Toolbar() {
  return (
    <Box className={styles.toolbar}>
      <Settings />
    </Box>
  );
}
export default Toolbar;
