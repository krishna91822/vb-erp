import { Fragment } from "react";
import SidebarNavigation from "./SidebarNavigation";
import classes from "./Layout.module.css";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <SidebarNavigation />
      <main className={classes.main}>
        <div className={classes.container}>{props.children}</div>
      </main>
    </Fragment>
  );
};

export default Layout;
