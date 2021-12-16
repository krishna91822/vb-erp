import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Clients from "../pages/Clients/Clients";
import CreateClient from "../pages/Clients/CreateClient";
import UpdateClient from "../pages/Clients/UpdateClient";
import CreateReward from "../pages/Rewards/CreateReward";
import EditReward from "../pages/Rewards/EditReward";
import RewardsList from "../pages/Rewards/RewardsList";
import POSOW_FORM from "../pages/ContractMgmtSys/POSOW_FORM";
import POSOW_tabView from "../pages/ContractMgmtSys/POSOW_tabView";
import POSOW_Read from "../pages/ContractMgmtSys/POSOW_Read";
import invoice_FORM from "../pages/ContractMgmtSys/invoice_FORM";
import POSOW_EDIT from "../pages/ContractMgmtSys/POSOW_EDIT";
import invoice_tabView from "../pages/ContractMgmtSys/invoice_tabView";
import INVOICE_Read from "../pages/ContractMgmtSys/INVOICE_Read";

import Profile from "../pages/myProfile/profile.component";
import ViewProfile from "./../components/templates/viewProfile/viewProfile.component";
import Network from "../pages/network/network.component";
import Review from "./../pages/review/review.component ";
import CreateProfile from "./../pages/createProfile/createProfile.component";

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
    path: "/invoice_details/:id",
    component: INVOICE_Read,
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
    path: "/rewards/create",
    component: CreateReward,
    title: "Create Reward",
  },
  {
    path: "/rewards/edit/:id",
    component: EditReward,
    title: "Edit Reward",
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
    path: "my-profile",
    component: Profile,
    title: "Templates",
  },
  {
    path: "my-profile/:empId",
    component: ViewProfile,
    title: "Templates",
  },
  {
    path: "network",
    component: Network,
    title: "Login",
  },
  {
    path: "reviews",
    component: Review,
    title: "Login",
  },
  {
    path: "create-profile",
    component: CreateProfile,
    title: "Login",
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
