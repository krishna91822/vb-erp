import { Route } from "react-router-dom";
import TemplateList from "../components/templates/TemplateList";

const ProtectedRoute = (route) => {
  // const { access, ...otherProps } = props;
  console.log(route);
  if (route.access)
    <Route
      path={route.path}
      exact
      element={(props) => <route.component {...props} />}
    />;
  else <TemplateList />;
};

export default ProtectedRoute;
