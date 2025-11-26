import { useState } from "react"
import API from "../api"

const SpesaForm = ({ onNewSpesa }) => {
  const [importo, setImporto] = useState("")
  const [tipo, setTipo] = useState("entrata")
  const [categoria, setCategoria] = useState("")
  const [data, setData] = useState("")
  const [warning, setWarning] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setWarning("Per aggiungere una spesa devi effettuare il login.")
      return
    }

    setWarning("")

    try {
      const res = await API.post("/spese", {
        importo,
        tipo,
        categoria,
        data,
      })

      onNewSpesa(res.data)

      setImporto("")
      setTipo("entrata")
      setCategoria("")
      setData("")
    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  return (
    <div className="w-full flex items-start md:items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl border-white/30 rounded-3xl shadow-2xl p-8 transition-all"
      >
        {warning && (
          <p className="text-red-600 bg-red-100/80 p-2 rounded-lg text-center mb-4 font-medium backdrop-blur-sm">
            {warning}
          </p>
        )}

        <div className="mb-6 text-center">
          <label className="block text-sm text-white/70 font-medium tracking-wide mb-3">
            Importo
          </label>
          <input
            type="number"
            placeholder="0.00€"
            value={importo}
            onChange={(e) => setImporto(e.target.value)}
            className="text-5xl font-bold w-full text-center p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/30 text-white
            placeholder-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
            required
          />
        </div>

        <div className="mb-6 flex items-center justify-center">
          <div
            className="relative inline-flex w-40 h-12 rounded-full cursor-pointer bg-white/20 backdrop-blur-lg border border-white/30"
            onClick={() => setTipo(tipo === "entrata" ? "uscita" : "entrata")}
          >
            <div
              className={`absolute top-1.5 w-1/2 h-9 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                tipo === "entrata" ? "left-1" : "right-1"
              }`}
            ></div>

            <span
              className={`absolute left-0 w-1/2 text-center text-sm font-medium leading-12 ${
                tipo === "entrata" ? "text-green-300" : "text-white/40"
              } `}
            >
              Entrata
            </span>

            <span
              className={`absolute right-0 w-1/2 text-center text-sm font-medium leading-12 ${
                tipo === "uscita" ? "text-red-300" : "text-white/40"
              }`}
            >
              Uscita
            </span>
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="block text-sm text-white/70 font-medium tracking-wide mb-3">
            Categoria
          </label>
          <input
            type="text"
            placeholder="Inserisci una categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-3 rounded-xl text-center text-white font-semibold bg-white/10 backdrop-blur-lg 
            border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
            required
          />
        </div>

        <div className="mb-6 text-center">
          <label className="block text-sm text-white/70 font-medium tracking-wide mb-3">
            Data
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-3 rounded-xl text-center text-white font-semibold bg-white/10 backdrop-blur-lg 
            border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Aggiungi transazione
        </button>
      </form>
    </div>
  )
}

export default SpesaForm
