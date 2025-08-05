import Home from './pages/CreateEmployeesPage';
import List  from './pages/CurrentEmployeesPage';
import ErrorPage  from './pages/Errors';
import Test from './pages/test.jsx';

const myRoutes = [
  { path: '/', component: <Home /> },
  { path: '/list', component: <List /> },
  { path: '/test', component: <Test /> },
  { path: '*', component: <ErrorPage /> },

];
export default myRoutes;