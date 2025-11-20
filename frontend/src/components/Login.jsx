import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/")
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message)
      } else {
        setError("Errore di connesione al server")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-blue-600 to-purple-700 p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
        alt="login secure"
        className="absolute opacity-20 w-80 top-12 left-12 hidden md:block select-none pointer-events-none"
      />

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-full max-w-md p-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Accedi</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-2 bg-white/20 hover:bg-white/30 transition text-white font-semibold py-3 rounded-xl border border-white/40"
          >
            Accedi
          </button>
        </form>

        <p className="text-center mt-6 text-white/70">
          Non hai un account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-white underline underline-offset-4 hover:text-purple-200"
          >
            Registrati
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
