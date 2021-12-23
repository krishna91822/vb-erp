import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Clients from "../pages/Clients/Clients";
import CreateClient from "../pages/Clients/CreateClient";
import UpdateClient from "../pages/Clients/UpdateClient";
import Projects from "../pages/pmo/Projects";
import CreateProject from "../pages/pmo/CreateProject";
import Allocations from "../pages/pmo/Allocations";
import CreateReward from "../pages/Rewards/CreateReward";
import EditReward from "../pages/Rewards/EditReward";
import RewardsList from "../pages/Rewards/RewardsList";
import POSOW_FORM from "../pages/ContractMgmtSys/POSOW_FORM";
import POSOW_tabView from "../pages/ContractMgmtSys/POSOW_tabView";
import POSOW_Read from "../pages/ContractMgmtSys/POSOW_Read";
import invoice_FORM from "../pages/ContractMgmtSys/invoice_FORM";
import POSOW_EDIT from "../pages/ContractMgmtSys/POSOW_EDIT";
import invoice_tabView from "../pages/ContractMgmtSys/invoice_tabView";
import { INVOICE_Read } from "../pages/ContractMgmtSys/invoice_READ";
import invoice_EDIT from "../pages/ContractMgmtSys/invoice_EDIT";
import SignIn from "../pages/LoginPage/Login";
import DescriptionAlerts from "../pages/LoginPage/Authorization";

import Profile from "../pages/myProfile/profile.component";
import ViewProfile from "./../components/templates/viewProfile/viewProfile.component";
import Network from "../pages/network/network.component";
import Review from "./../pages/review/review.component ";
import CreateProfile from "./../pages/createProfile/createProfile.component";

import UseRoles from "./roles";

const { isHrAdmin, isUser } = UseRoles();

const routes = [
  {
    path: "/",
    component: Profile,
    title: "Profile",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/posow/create",
    component: POSOW_FORM,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/posow",
    component: POSOW_tabView,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/posow/detail/:id",
    component: POSOW_Read,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/invoices",
    component: invoice_tabView,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/invoice/create-invoice",
    component: invoice_FORM,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/invoice_details/:id",
    component: INVOICE_Read,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/invoice/edit/:id",
    component: invoice_EDIT,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/posow/edit/:id",
    component: POSOW_EDIT,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/templates",
    component: Templates,
    title: "Templates",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/pmo/projects",
    component: Projects,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/pmo/projects/create",
    component: CreateProject,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/pmo/projects/:id",
    component: CreateProject,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/pmo/projects/:id/edit",
    component: CreateProject,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/pmo/allocations",
    component: Allocations,
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/rewards/create",
    component: CreateReward,
    title: "Create Reward",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/rewards",
    component: RewardsList,
    title: "Rewards List",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/rewards/edit/:id",
    component: EditReward,
    title: "Edit Reward",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/login",
    component: SignIn,
    title: "Login Page",
  },
  {
    path: "/authorization",
    component: DescriptionAlerts,
    title: "authorization",
  },
  {
    path: "/cims",
    component: Clients,
    title: "Clients",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/cims/create",
    component: CreateClient,
    title: "Create Client",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "/cims/clientdetails/:id",
    component: UpdateClient,
    title: "Update Client",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "my-profile",
    component: Profile,
    title: "Templates",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "my-profile/:empId",
    component: ViewProfile,
    title: "Templates",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "network",
    component: Network,
    title: "Login",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "reviews",
    component: Review,
    title: "Login",
    // hr - t & u -f => t
    access: [isHrAdmin, isUser].every((x) => x),
  },
  {
    path: "create-profile",
    component: CreateProfile,
    title: "Login",
    access: [isHrAdmin, isUser].every(Boolean),
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
