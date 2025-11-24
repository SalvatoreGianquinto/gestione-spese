import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [saldo, setSaldo] = useState(0)

  const location = useLocation()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const aggiornaSaldo = () => {
      const storedSaldo = Number(localStorage.getItem("saldo")) || 0
      setSaldo(storedSaldo)
    }

    window.addEventListener("saldoAggiornato", aggiornaSaldo)
    aggiornaSaldo()

    return () => window.removeEventListener("saldoAggiornato", aggiornaSaldo)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Gestione Spese
      </h1>

      <div className="hidden md:flex items-center gap-6">
        <span className="text-gray-700 font-semibold">
          Ciao, {user?.nome || "Utente"}
        </span>

        <button onClick={() => navigate("/")} className="hover:text-black">
          Home
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="hover:text-black"
        >
          Analytics
        </button>

        <button
          onClick={() => navigate("/profilo")}
          className="hover:text-black"
        >
          Profilo
        </button>

        {location.pathname === "/" && (
          <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-gray-700">
            Saldo: € {saldo.toFixed(2)}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-red-600 font-semibold hover:text-red-800"
        >
          Logout
        </button>
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
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 md:hidden w-40">
          <span className="text-gray-700 font-semibold">
            Ciao, {user?.nome || "Utente"}
          </span>

          <button
            onClick={() => {
              navigate("/")
              setOpen(false)
            }}
            className="text-left"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/analytics")
              setOpen(false)
            }}
            className="text-left"
          >
            Analytics
          </button>

          <button
            onClick={() => {
              navigate("/profilo")
              setOpen(false)
            }}
            className="text-left"
          >
            Profilo
          </button>

          {location.pathname === "/" && (
            <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-center">
              € {saldo.toFixed(2)}
            </span>
          )}

          <button onClick={handleLogout} className="text-red-600 font-semibold">
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
