import { useState } from "react"
import SpeseList from "./SpeseList"
import ChartEntrateUscite from "./ChartEntrateUscite"

const SpeseContainer = ({ spese, onDelete, onUpdate }) => {
  const [mese, setMese] = useState(String(new Date().getMonth() + 1))

  const speseFiltrate = mese
    ? spese.filter((s) => new Date(s.data).getMonth() + 1 === Number(mese))
    : spese

  const entrate = speseFiltrate.filter((s) => s.tipo === "entrata")
  const uscite = speseFiltrate.filter((s) => s.tipo === "uscita")

  const totaleEntrate = entrate.reduce(
    (sum, item) => sum + Number(item.importo),
    0
  )

  const totaleUscite = uscite.reduce(
    (sum, item) => sum + Number(item.importo),
    0
  )
  const saldoMese = totaleEntrate - totaleUscite

  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4">
      <div className="w-full mb-2 flex justify-end">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-4">
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
              className={`
        shrink-0 px-4 py-2 rounded-full font-medium transition-all 
        ${
          mese == i + 1
            ? "bg-indigo-500 text-white shadow-md"
            : "bg-white text-gray-700 border border-gray-300 shadow-sm"
        }
      `}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`p-3 rounded-xl text-center font-semibold shadow-md
    ${
      saldoMese >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
      >
        Saldo del mese: € {saldoMese.toFixed(2)}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <SpeseList
            title="Entrate"
            spese={entrate}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />

          <div className="mt-2 p-3 bg-green-100 rounded-xl text-center font-semibold">
            Totale Entrate: € {totaleEntrate.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <SpeseList
            title="Uscite"
            spese={uscite}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
          <div className="mt-2 p-3 bg-red-100 rounded-xl text-center font-semibold">
            Totale Uscite: € {totaleUscite.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeseContainer
