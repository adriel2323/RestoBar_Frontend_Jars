import "bootstrap/dist/css/bootstrap.min.css"
import Menu from "./Components/Menu";
import Mesas from "./Components/Mesas";
import Login from "./Components/Login";
import Ordenes from "./Components/Ordenes";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrdenProvider } from "./context/OrdenContext";
import OrdenConfirmada from "./Components/OrdenConfirmada";

export const rutas = [
  { path: '/', element: <Login /> },
  { path: '/mesas', element: <Mesas />},
  { path: '/menu/:id', element: <Menu />, previous: '/mesas' },
  { path: '/orden/:id', element: <Ordenes/>, previous: '/menu/:id' },
  { path: '/ordenConfirmada/:id', element: <OrdenConfirmada/>, previous: '/menu/:id' },
];


function App() {
  return (
    <BrowserRouter>
      <OrdenProvider>
          <Routes >
          {rutas.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} previous={route.previous} />
            ))}
          </Routes>
      </OrdenProvider>
    </BrowserRouter>
  )
}

export default App;