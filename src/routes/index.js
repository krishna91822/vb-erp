import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import POSOW_FORM from "../pages/ContractMgmtSys/POSOW_FORM";
import POSOW_tabView from "../pages/ContractMgmtSys/POSOW_tabView";
import POSOW_Read from "../pages/ContractMgmtSys/POSOW_Read";
import invoice_FORM from "../pages/ContractMgmtSys/invoice_FORM";
import POSOW_EDIT from "../pages/ContractMgmtSys/POSOW_EDIT";
import invoice_tabView from "../pages/ContractMgmtSys/invoice_tabView";
import INVOICE_Read from "../pages/ContractMgmtSys/INVOICE_Read";

const routes = [
  {
    path: "/",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/capture_new_SOW",
    component: POSOW_FORM,
  },
  {
    path: "/POSOW",
    component: POSOW_tabView,
  },
  {
    path: "/POSOW_detail/:id",
    component: POSOW_Read,
  },
  {
    path: "/invoiceinfo",
    component: invoice_tabView,
  },
  {
    path: "/capture_invoice",
    component: invoice_FORM,
  },
  {
    path: "/invoice_details/:id",
    component: INVOICE_Read,
  },
  {
    path: "/SOW_details/edit/:id",
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
