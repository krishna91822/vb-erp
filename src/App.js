import { Route, Routes } from "react-router-dom";
import RRoutes from "./routes/index";
import Layout from "./components/layout/Layout";
import Notification from "./components/UI/Notification";
import PageLoader from "./components/UI/PageLoader";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { CssBaseline } from "@mui/material";
import DescriptionAlerts from "./pages/LoginPage/Authorization";
import { useEffect } from "react";
import { tokenValidate } from "./store/user-actions";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const notification = useSelector((state) => state.ui.notification);
  const loader = useSelector((state) => state.ui.loading);
  const { routes } = RRoutes();
  useEffect(() => {
    if (cookie.load("token")) {
      dispatch(tokenValidate()).then((res) => {
        if (res) {
          location.pathname === "/" && navigate("/my-profile");
          location.pathname.includes("/setpassword") && navigate("/my-profile");
        }
        if (!res) {
          cookie.remove("token");
          navigate("/");
        }
      });
    } else {
      location.pathname === "/:id/setpassword" && navigate("/:id/setpassword");
      location.pathname === "/" && navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      {notification && !loader && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {loader && <PageLoader />}
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.access ? <route.component /> : <DescriptionAlerts />
              }
            ></Route>
          ))}
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
