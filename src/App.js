import { Route, Switch } from "react-router-dom";

import routes from "./routes/index";
import Layout from "./components/layout/Layout";
import Notification from "./components/UI/Notification";
import PageLoader from "./components/UI/PageLoader";
import { useSelector } from "react-redux";
import { Fragment } from "react";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const loader = useSelector((state) => state.ui.loading);

  return (
    <Fragment>
      {notification && !loader && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {loader && <PageLoader />}
      <Layout>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              render={(props) => <route.component {...props} />}
            ></Route>
          ))}
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
