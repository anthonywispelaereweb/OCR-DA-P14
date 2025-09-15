import myRoutes from './routing'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <>
      <Routes>
        {myRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  )
}

export default App
