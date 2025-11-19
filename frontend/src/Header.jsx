import { useNavigate } from "react-router-dom"

const Header = ({ spese }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login")
  }

  const saldoNetto = spese
    ? spese.reduce(
        (acc, s) => acc + (s.tipo === "entrata" ? s.importo : -s.importo),
        0
      )
    : 0

  return (
    <header className="w-full bg-gray-200 shadow-md p-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {user ? (
          <>
            <h1 className="text-xl font-bold">Ciao {user.nome}</h1>
            <span className="text-lg font-semibold">
              Saldo netto: {saldoNetto}€
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
