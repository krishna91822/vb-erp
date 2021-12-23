import { Route, Routes } from "react-router-dom";

import routes from "./routes/index";
import Layout from "./components/layout/Layout";
import Notification from "./components/UI/Notification";
import PageLoader from "./components/UI/PageLoader";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { CssBaseline } from "@mui/material";
// import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const loader = useSelector((state) => state.ui.loading);
  // console.log(routes);
  console.log("I'm in APP");
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
            // <ProtectedRoute exact key={index} {...route}></ProtectedRoute>
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
