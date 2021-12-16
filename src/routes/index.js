import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import CreateReward from "../pages/Rewards/CreateReward";
import RewardsList from "../pages/Rewards/RewardsList";

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
    path: "/rewards",
    component: RewardsList,
    title: "Rewards",
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
