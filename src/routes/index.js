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
    path: "/capture_new_SOW",
    component: POSOW_FORM,
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
    path: "/invoiceinfo",
    component: invoice_tabView,
    title: "Not Found",
  },
  {
    path: "/capture_invoice",
    component: invoice_FORM,
    title: "Not Found",
  },
  {
    path: "/invoice_details/:id",
    component: invoice_READ,
    title: "Not Found",
  },
  {
    path: "/SOW_details/edit/:id",
    component: POSOW_EDIT,
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
