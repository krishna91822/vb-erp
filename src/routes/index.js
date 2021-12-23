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

const Routes = () => {
  const { isHrAdmin, isUser, isSuperAdmin } = UseRoles();
  const routes = [
    {
      path: "/",
      // component: Profile,
      component: SignIn,
      access: true,
      //title: "Profile",
      //access: [UseRoles.isHrAdmin, UseRoles.isUser].some((x) => x),
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
      path: "/invoice/edit/:id",
      component: invoice_EDIT,
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
      path: "/pmo/projects",
      component: Projects,
    },
    {
      path: "/pmo/projects/create",
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
      path: "/rewards/create",
      component: CreateReward,
      title: "Create Reward",
    },
    {
      path: "/rewards",
      component: RewardsList,
      title: "Rewards List",
    },
    {
      path: "/rewards/edit/:id",
      component: EditReward,
      title: "Edit Reward",
    },
    {
      path: "/login",
      title: "Login",
      component: SignIn,
      access: true,
    },
    {
      path: "/cims",
      component: Clients,
      title: "Clients",
      access: [isHrAdmin, isUser, isSuperAdmin].some((x) => x),
    },
    {
      path: "/cims/create",
      component: CreateClient,
      title: "Create Client",
      access: [isHrAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/cims/clientdetails/:id",
      component: UpdateClient,
      title: "Update Client",
      access: [isHrAdmin, isUser, isSuperAdmin].some((x) => x),
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
      path: "/not_auth",
      component: DescriptionAlerts,
      title: "Login",
    },
    {
      path: "*",
      component: NotFound,
      title: "Not Found",
    },
  ];

  return { routes };
};

export default Routes;
