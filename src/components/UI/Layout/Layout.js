import styles from './Layout.module.css';

const Layout = ({ children, title = 'World-n-Trips' }) => {
  document.title = title;

  return (
    <div className={styles.container}>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />

      <main>{children}</main>

      <footer className={styles.footer}>Jordi MJ @ World-n-Trips</footer>
    </div>
  );
};

export default Layout;
