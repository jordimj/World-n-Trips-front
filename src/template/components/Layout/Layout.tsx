import { ReactNode } from 'react';
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

  return (
    <>
      <NavigationItems />
      <Box
        className={styles.container}
        sx={{ width: fullWidth ? '90%' : '1600px', transition: 'ease-in-out 1s' }}
      >
        <Toolbar />
        <main className={styles.main}>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
