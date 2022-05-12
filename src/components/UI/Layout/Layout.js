import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import useFullWidth from '../../../hooks/useFullWidth';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Spinner from '../Spinner/Spinner';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const loading = useSelector((state) => state.loading);

  const { fullWidth } = useFullWidth();

  return (
    <Box
      className={styles.container}
      sx={{ maxWidth: fullWidth ? '90%' : '1600px', transition: 'ease-in-out 1s' }}
    >
      <Toolbar />
      {loading && <Spinner />}
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>Jordi MJ @ World-n-Trips</footer>
    </Box>
  );
};

export default Layout;
