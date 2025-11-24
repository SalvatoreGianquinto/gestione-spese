import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Profilo from "./components/Profilo"

function AppWrapper() {
  const location = useLocation()

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profilo" element={<Profilo />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}
