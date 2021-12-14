import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Projects from "../pages/pmo/Projects";
import CreateProject from "../pages/pmo/CreateProject";
import Allocations from "../pages/pmo/Allocations";

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
    path: "/pmo/projects",
    component: Projects,
  },
  {
    path: "/pmo/project/create",
    component: CreateProject,
  },
  {
    path: "/pmo/projects/:id",
    component: CreateProject,
  },
  {
    path: "/pmo/projects/:id/edit",
    component: CreateProject,
  },
  {
    path: "/pmo/allocations",
    component: Allocations,
  },
  {
    path: "/login",
    title: "Login",
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
