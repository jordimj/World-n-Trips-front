import { useSelector } from 'react-redux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Spinner from '../Spinner/Spinner';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <div className={styles.container}>
      <Toolbar />
      {loading && <Spinner />}
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>Jordi MJ @ World-n-Trips</footer>
    </div>
  );
};

export default Layout;
