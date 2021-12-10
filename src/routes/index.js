import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import POSOW_FORM from "../pages/ContractMgmtSys/POSOW_FORM";
import POSOW_tabView from "../pages/ContractMgmtSys/POSOW_tabView";
import POSOW_Read from "../pages/ContractMgmtSys/POSOW_Read";
import invoice_FORM from "../pages/ContractMgmtSys/invoice_FORM";
import invoice_READ from "../pages/ContractMgmtSys/invoice_READ";
import POSOW_EDIT from "../pages/ContractMgmtSys/POSOW_EDIT";
import invoice_tabView from "../pages/ContractMgmtSys/invoice_tabView";

const routes = [
  {
    path: "/",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/posow/create",
    component: POSOW_FORM,
  },
  {
    path: "/posow",
    component: POSOW_tabView,
  },
  {
    path: "/posow/detail/:id",
    component: POSOW_Read,
  },
  {
    path: "/invoices",
    component: invoice_tabView,
  },
  {
    path: "/invoice/create-invoice",
    component: invoice_FORM,
  },
  {
    path: "invoice/detail/:id",
    component: invoice_READ,
  },
  {
    path: "/posow/edit/:id",
    component: POSOW_EDIT,
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
