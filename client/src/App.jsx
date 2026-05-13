import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Generate from "./pages/Generate"
import Signup from "./pages/Signup"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/generate"
          element={<Generate />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App