import { Route, Routes } from "react-router-dom";

import routes from "./routes/index";
import Layout from "./components/layout/Layout";
import Notification from "./components/UI/Notification";
import PageLoader from "./components/UI/PageLoader";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { CssBaseline } from "@mui/material";
import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const loader = useSelector((state) => state.ui.loading);

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
            <ProtectedRoute exact key={index} {...route}></ProtectedRoute>
          ))}
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
