import { Fragment } from "react";
import SidebarNavigation from "./SidebarNavigation";
import classes from "./Layout.module.css";
import Header from "./Header";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const user = useSelector((state) => state.user.user);
  const myStyle = user.name ? classes.container : classes.signInContainer;
  return (
    <Fragment>
      <Header />
      {user.name && <SidebarNavigation />}
      <main className={classes.main}>
        <div className={myStyle}>{props.children}</div>
      </main>
    </Fragment>
  );
};

export default Layout;
