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
import Analytics from "./components/Analytics"
import Footer from "./components/Footer"

function AppWrapper() {
  const location = useLocation()

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <div className="grow pt-6">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}
