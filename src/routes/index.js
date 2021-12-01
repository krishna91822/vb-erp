import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import CreateReward from "../pages/Rewards/CreateReward";

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
    path: "/rewards/create",
    component: CreateReward,
    title: "Create Reward",
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
