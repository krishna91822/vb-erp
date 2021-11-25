import NotFound from '../pages/NotFound';

import Profile from './../pages/profile.component';
import WithSpinner from '../components/hoc/withSpinner/withSpinner.component';
import ViewProfile from './../components/templates/viewProfile/viewProfile.component';
import Network from '../pages/network/network.component';
import CreateProfile from './../pages/createProfile/createProfile.component';

const ProfileWithSpinner = WithSpinner(Profile);
const ViewProfileWithSpinner = WithSpinner(ViewProfile);
const NetworkWithSpinner = WithSpinner(Network);

const routes = [
  {
    path: '/my-profile',
    component: ProfileWithSpinner,
    title: 'Templates',
  },
  {
    path: '/my-profile/:empId',
    component: ViewProfileWithSpinner,
    title: 'Templates',
  },
  {
    path: '/network',
    component: NetworkWithSpinner,
    title: 'Login',
  },
  {
    path: '/create-profile',
    component: CreateProfile,
    title: 'Login',
  },
  {
    path: '*',
    component: NotFound,
    title: 'Not Found',
  },
];

export default routes;
