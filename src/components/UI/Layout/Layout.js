import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <title>World-n-Trips</title>
      <link rel="icon" href="/favicon.ico" />

      <main>{children}</main>

      <footer className={styles.footer}>Jordi MJ @ World-n-Trips</footer>
    </div>
  );
};

export default Layout;
