import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const user = JSON.parse(localStorage.getItem("user"))
  const saldo = Number(localStorage.getItem("saldo")) || 0

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="w-full bg-white/70 shadow-xl px-6 py-4 flex justify-between items-center top-0 z-20">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Gestione Spese
      </h1>

      <div className="hidden md:flex items-center gap-6">
        {!user ? (
          <>
            <button onClick={() => navigate("/login")} className="font-medium">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="font-medium"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="font-semibold">Ciao, {user.nome}</span>

            <button
              onClick={() => navigate("/analytics")}
              className="font-medium"
            >
              Analytics
            </button>

            <button
              onClick={() => navigate("/profilo")}
              className="font-medium"
            >
              Profilo
            </button>

            {location.pathname === "/" && (
              <span className="px-4 py-2 bg-white/70 rounded-lg font-semibold">
                Saldo: € {saldo.toFixed(2)}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setOpen(!open)}
      >
        <span className="w-6 h-1 bg-black rounded"></span>
        <span className="w-6 h-1 bg-black rounded"></span>
        <span className="w-6 h-1 bg-black rounded"></span>
      </button>

      {open && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 md:hidden w-40 z-50">
          {!user ? (
            <>
              <button
                onClick={() => {
                  navigate("/login")
                  setOpen(false)
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register")
                  setOpen(false)
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="font-semibold">Ciao, {user.nome}</span>

              <button
                onClick={() => {
                  navigate("/analytics")
                  setOpen(false)
                }}
              >
                Analytics
              </button>

              <button
                onClick={() => {
                  navigate("/profilo")
                  setOpen(false)
                }}
              >
                Profilo
              </button>

              {location.pathname === "/" && (
                <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-center">
                  € {saldo.toFixed(2)}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
