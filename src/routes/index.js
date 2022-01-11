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

import UseRoles from "../helpers/roles";

const Routes = () => {
  const {
    isUser,
    isApprover,
    isLeader,
    isHrAdmin,
    isFinanceAdmin,
    isPMSAdmin,
    isSuperAdmin,
  } = UseRoles();

  const routes = [
    {
      path: "/",
      component: SignIn,
      access: true,
    },
    {
      path: "/login",
      title: "Login",
      component: SignIn,
      access: true,
    },
    {
      path: "my-profile",
      component: Profile,
      title: "Templates",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "my-profile/:empId",
      component: ViewProfile,
      title: "Templates",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "network",
      component: Network,
      title: "Login",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "reviews",
      component: Review,
      title: "Login",
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "create-profile",
      component: CreateProfile,
      title: "Login",
      access: [isHrAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/cims",
      component: Clients,
      title: "Clients",
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/cims/create",
      component: CreateClient,
      title: "Create Client",
      access: [isApprover, isLeader, isPMSAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/cims/clientdetails/:id",
      component: UpdateClient,
      title: "Update Client",
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/pmo/projects",
      component: Projects,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/pmo/projects/create",
      component: CreateProject,
      access: [isApprover, isLeader, isPMSAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/pmo/projects/:id",
      component: CreateProject,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/pmo/projects/:id/edit",
      component: CreateProject,
      access: [isApprover, isLeader, isPMSAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/pmo/allocations",
      component: Allocations,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/posow/create",
      component: POSOW_FORM,
      access: [
        isApprover,
        isLeader,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/posow",
      component: POSOW_tabView,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/posow/detail/:id",
      component: POSOW_Read,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/posow/edit/:id",
      component: POSOW_EDIT,
      access: [
        isApprover,
        isLeader,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/invoices",
      component: invoice_tabView,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/invoice/create-invoice",
      component: invoice_FORM,
      access: [
        isApprover,
        isLeader,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/invoice_details/:id",
      component: INVOICE_Read,
      access: [
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/invoice/edit/:id",
      component: invoice_EDIT,
      access: [
        isApprover,
        isLeader,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "/rewards/create",
      component: CreateReward,
      title: "Create Reward",
      access: [isLeader, isHrAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/rewards",
      component: RewardsList,
      title: "Rewards List",
      access: [isLeader, isHrAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/rewards/edit/:id",
      component: EditReward,
      title: "Edit Reward",
      access: [isLeader, isHrAdmin, isSuperAdmin].some((x) => x),
    },
    {
      path: "/templates",
      component: Templates,
      title: "Templates",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
    {
      path: "*",
      component: NotFound,
      title: "Not Found",
      access: [
        isUser,
        isApprover,
        isLeader,
        isHrAdmin,
        isFinanceAdmin,
        isPMSAdmin,
        isSuperAdmin,
      ].some((x) => x),
    },
  ];

  return { routes };
};

export default Routes;
