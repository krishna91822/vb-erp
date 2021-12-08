import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Clients from "../pages/Clients/Clients";
import CreateClient from "../pages/Clients/CreateClient";
import UpdateClient from "../pages/Clients/UpdateClient";

const routes = [
  {
    path: "/",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/templates",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/login",
    title: "Login",
  },
  {
    path: "/cims",
    component: Clients,
    title: "Clients",
  },
  {
    path: "/cims/create",
    component: CreateClient,
    title: "Create Client",
  },
  {
    path: "/cims/clientdetails/:id",
    component: UpdateClient,
    title: "Update Client",
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
