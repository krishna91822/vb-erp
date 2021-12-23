import { Route } from "react-router";
import TemplateList from "../components/templates/TemplateList";

const ProtectedRoute = (route) => {
  // const { access, ...otherProps } = props;

  if (route.access)
    <Route
      path={route.path}
      exact
      element={(props) => <route.component {...props} />}
    />;
  else <TemplateList />;
};

export default ProtectedRoute;
