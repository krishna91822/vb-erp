import { Fragment, useEffect, useState } from "react";

import { Route, Switch, withRouter } from "react-router-dom";

import routes from "./routes/routes";

import Layout from "./components/layout/Layout";

import { useDispatch } from "react-redux";
import {
  setCurrentEmployee,
  setAllEmployees,
} from "./redux/employee/employee.actions";

import axios from "axios";

function App({ match, history }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const baseURL = "http://localhost:5000/employee";
  const currentEmployeeId = "VB6";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      //set current employee and all employees
      if (response) {
        dispatch(setAllEmployees(response.data));
        dispatch(
          setCurrentEmployee(
            response.data.find((res) => res.empId === currentEmployeeId)
          )
        );
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Layout>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              render={(props) => (
                <route.component isLoading={loading} {...props} />
              )}
            ></Route>
          ))}
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default withRouter(App);
