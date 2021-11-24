import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
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
