import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Registers";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";

import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/visitors"
          element={
            <PrivateRoute>
              <Visitors />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;