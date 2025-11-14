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
      alert(`Login effettuato! Benvenuto ${res.data.user.nome}`)
      navigate("/home")
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message)
      } else {
        setError("Errore di connesione al server")
      }
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="basis-3/5 bg-blue-500 flex flex-col justify-center items-center p-10 text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-500 p-8 rounded-xl w-96 flex flex-col gap-4"
        >
          <h2 className="flex justify-center items-center text-4xl font-bold text-white">
            Login
          </h2>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-gray-900 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white transition"
            required
          />
          <input
            type="password"
            autoComplete="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-gray-900 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white transition"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-blue-900 py-2 rounded-lg text-white font-semibold w-full
            hover:bg-blue-800 active:scale-95 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
      <div className="basis-2/5 bg-red-500 flex flex-col items-center justify-center p-10">
        {" "}
        <h2 className="text-4xl mb-5 font-bold text-white">
          Non hai un account?
        </h2>
        <button
          onClick={() => navigate("/register")}
          className="mt-4 px-6 py-2 rounded-lg border border-white text-white font-semibold
           hover:bg-white hover:text-red-500 transition duration-300 shadow-lg"
        >
          {" "}
          Registrati
        </button>
      </div>
    </div>
  )
}

export default Login
