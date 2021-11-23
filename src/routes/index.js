import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import POSOW from "../pages/ContractMgmtSys/POSOW";
import POSOW_tabView from "../pages/ContractMgmtSys/POSOW_tabView";
import POSOW_Read from "../pages/ContractMgmtSys/POSOW_Read";

const routes = [
  {
    path: "/",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/capture_new_SOW",
    component: POSOW,
    title: "Not Found",
  },
  {
    path: "/POSOW",
    component: POSOW_tabView,
    title: "Not Found",
  },
  {
    path: "/POSOW_detail/:id",
    component: POSOW_Read,
    title: "Not Found",
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
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
