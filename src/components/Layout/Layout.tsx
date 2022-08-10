import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";
import Menu from "./Menu";

const Layout = (props: any) => {
  return (
    <>
      {/* <MainNavigation /> */}
      <Menu />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
