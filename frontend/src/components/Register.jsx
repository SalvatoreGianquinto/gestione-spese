import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("http://localhost:5000/register", {
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
    <div className="flex h-screen w-full">
      <div className="basis-2/5 bg-red-500 flex flex-col justify-center items-center p-10 text-white">
        <h2 className="text-5xl mb-5 font-bold">Sei pronto?</h2>
        <p className="text-3xl mb-5 font-bold">Hai già un account?</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 rounded-lg border border-white text-white font-semibold
           hover:bg-white hover:text-red-500 transition duration-300 shadow-lg"
        >
          {" "}
          Vai al Login
        </button>
      </div>
      <div className="basis-3/5 bg-blue-500 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-500 p-8 rounded-xl w-96 flex flex-col gap-4"
        >
          <h2 className="flex justify-center items-center text-4xl font-bold text-white">
            REGISTRATI
          </h2>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-gray-900 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-gray-900 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white transition"
            required
          />
          <input
            type="password"
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
            Registrati
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
