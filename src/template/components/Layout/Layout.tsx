import { ReactNode } from 'react';
import { Box } from '@mui/material';
import useFullWidth from '@/hooks/useFullWidth';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { fullWidth } = useFullWidth();

  return (
    <Box
      className={styles.container}
      sx={{ maxWidth: fullWidth ? '90%' : '1600px', transition: 'ease-in-out 1s' }}
    >
      <Toolbar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Jordi MJ @ World-n-Trips</footer>
    </Box>
  );
};

export default Layout;
