import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import useFullWidth from '@/hooks/useFullWidth';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { fullWidth } = useFullWidth();

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <NavigationItems />
      <Box
        className={`${styles.container} ${isHome ? styles.home : ''}`}
        sx={{
          width: fullWidth
            ? 'calc(100% - var(--spacing-4) * 2)'
            : `min(${isHome ? 2000 : 1600}px, calc(100% - var(--spacing-4) * 2))`,
          transition: 'ease-in-out 1s',
        }}
      >
        <Toolbar />
        <main className={styles.main}>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
