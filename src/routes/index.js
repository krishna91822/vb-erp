import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Projects from "../pages/pmo/Projects";
import CreateProject from "../pages/pmo/CreateProject";
import Allocations from "../pages/pmo/Allocations";
import CreateReward from "../pages/Rewards/CreateReward";
import RewardsList from "../pages/Rewards/RewardsList";

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
    path: "/login",
    title: "Login",
  },
  {
    path: "/rewards",
    component: RewardsList,
    title: "Rewards",
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
