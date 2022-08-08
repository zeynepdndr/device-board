import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = (props: any) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
