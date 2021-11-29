import { Fragment } from "react";
import SidebarNavigation from "./SidebarNavigation";
import classes from "./Layout.module.css";
import Header from "./Header";
import { Grid } from "@mui/material";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <Grid container spacing={0} sx={{ pt: "70px", position: "relative" }}>
        <Grid item xs={2}>
          <SidebarNavigation />
        </Grid>
        <Grid item xs={10}>
          <main className={classes.main}>
            <div className={classes.container}>{props.children}</div>
          </main>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Layout;
