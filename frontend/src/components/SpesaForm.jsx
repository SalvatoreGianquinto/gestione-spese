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
    <div className="w-full min-h-screen flex items-start md:items-start bg-gray-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg border"
      >
        {warning && (
          <p className="text-red-600 bg-red-100 p-2 rounded-lg text-center mb-4 font-medium">
            {warning}
          </p>
        )}

        <div className="mb-6 text-center">
          <label className="block text-sm font-medium text-gray-600">
            Importo
          </label>
          <input
            type="number"
            placeholder="0.00€"
            value={importo}
            onChange={(e) => setImporto(e.target.value)}
            className="text-5xl font-bold w-full text-center outline-none border-b p-2"
            required
          />
        </div>

        <div className="mb-6 flex items-center justify-center">
          <div
            className="relative inline-flex w-40 h-10 bg-gray-200 rounded-full cursor-pointer"
            onClick={() => setTipo(tipo === "entrata" ? "uscita" : "entrata")}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-1/2 h-9 bg-white rounded-full shadow transition-transform duration-300 ${
                tipo === "uscita" ? "translate-x-full" : ""
              }`}
            ></div>
            <span
              className={`absolute left-0 w-1/2 text-center text-sm font-medium mt-2 ${
                tipo === "entrata" ? "text-green-700" : "text-gray-500"
              }`}
            >
              Entrata
            </span>
            <span
              className={`absolute right-0 w-1/2 text-center text-sm font-medium mt-2 ${
                tipo === "uscita" ? "text-red-700" : "text-gray-500"
              }`}
            >
              Uscita
            </span>
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Categoria
          </label>
          <input
            type="text"
            placeholder="Inserisci una categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="text-xl font-bold w-full text-center outline-none p-2"
            required
          />
        </div>

        <div className="mb-6 text-center">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Data
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="text-xl font-bold w-full text-center outline-none p-2 border-b"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          Aggiungi transazione
        </button>
      </form>
    </div>
  )
}

export default SpesaForm
