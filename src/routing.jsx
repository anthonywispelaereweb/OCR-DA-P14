import Home from './pages/CreateEmployeesPage'
import List from './pages/CurrentEmployeesPage'
import ErrorPage from './pages/Errors'

const myRoutes = [
  { path: '/', component: <Home /> },
  { path: '/list', component: <List /> },
  { path: '*', component: <ErrorPage /> },
  { path: '/error/:errorId', component: <ErrorPage /> }
]
export default myRoutes
