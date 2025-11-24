import { useEffect, useState } from "react"
import API from "../api"
import ChartEntrateUscite from "./ChartEntrateUscite"

const Analytics = () => {
  const [spese, setSpese] = useState([])
  const [mese, setMese] = useState(String(new Date().getMonth() + 1))

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/spese")
      setSpese(res.data)
    }
    fetch()
  }, [])

  const speseFiltrate = spese.filter(
    (s) => new Date(s.data).getMonth() + 1 === Number(mese)
  )

  const entrate = speseFiltrate.filter((s) => s.tipo === "entrata")
  const uscite = speseFiltrate.filter((s) => s.tipo === "uscita")

  const totaleEntrate = entrate.reduce((sum, i) => sum + Number(i.importo), 0)

  const totaleUscite = uscite.reduce((sum, i) => sum + Number(i.importo), 0)

  const saldoMese = totaleEntrate - totaleUscite

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-6">
        {[
          "Gen",
          "Feb",
          "Mar",
          "Apr",
          "Mag",
          "Giu",
          "Lug",
          "Ago",
          "Set",
          "Ott",
          "Nov",
          "Dic",
        ].map((m, i) => (
          <button
            key={m}
            onClick={() => setMese(i + 1)}
            className={`shrink-0 px-4 py-2 rounded-full font-medium transition
              ${
                mese == i + 1
                  ? "bg-indigo-500 text-white shadow"
                  : "bg-white text-gray-700 border"
              }
            `}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded-xl font-semibold text-center">
          Entrate: € {totaleEntrate.toFixed(2)}
        </div>
        <div className="p-4 bg-red-100 rounded-xl font-semibold text-center">
          Uscite: € {totaleUscite.toFixed(2)}
        </div>
        <div className="p-4 bg-blue-100 rounded-xl font-semibold text-center">
          Saldo del mese: € {saldoMese.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border w-full h-96">
        <ChartEntrateUscite entrate={totaleEntrate} uscite={totaleUscite} />
      </div>
    </div>
  )
}

export default Analytics
