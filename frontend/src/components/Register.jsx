import { useState } from "react"
import axios from "axios"
import zxcvbn from "zxcvbn"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [strength, setStrenght] = useState(0)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("/register", {
        nome,
        email,
        password,
      })
      alert(res.data.message)
      navigate("/login")
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message)
      } else {
        setError("Errore di connesione al server")
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative 
    overflow-hidden bg-linear-to-br from-indigo-600 via-blue-600 to-purple-600 p-6"
    >
      <div className="absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-32 animate-[wave_6s_ease_in_out_infinite]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            d="M0,192L80,197.3C160,203,320,213,480,186.7C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128V320H0Z"
          ></path>
        </svg>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-full max-w-md p-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Registrati</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setStrenght(zxcvbn(e.target.value).score)
            }}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          <div className="w-full h-2 bg-white/20 rounded-full mt-1 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength === 0
                  ? "w-1/12 bg-red-500"
                  : strength === 1
                  ? "w-1/4 bg-orange-500"
                  : strength === 2
                  ? "w-1/2 bg-yellow-500"
                  : strength === 3
                  ? "w-3/4 bg-blue-900"
                  : "w-full bg-green-700"
              }`}
            ></div>
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-2 bg-white/20 hover:bg-white/30 transition text-white font-semibold py-3 rounded-xl border border-white/40"
          >
            Crea account
          </button>
        </form>
        <p className="text-center mt-6 text-white/70">
          Hai già un account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-white underline underline-offset-4 hover:text-purple-200"
          >
            Accedi
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
