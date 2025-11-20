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
        <select
          value={mese}
          onChange={(e) => setMese(e.target.value)}
          className="bg-white p-2 rounded-lg shadow-md border"
        >
          <option value="">Tutti i mesi</option>
          <option value={1}>Gennaio</option>
          <option value={2}>Febbraio</option>
          <option value={3}>Marzo</option>
          <option value={4}>Aprile</option>
          <option value={5}>Maggio</option>
          <option value={6}>Giugno</option>
          <option value={7}>Luglio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Settembre</option>
          <option value={10}>Ottobre</option>
          <option value={11}>Novembre</option>
          <option value={12}>Dicembre</option>
        </select>
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
      <div className="w-full mt-6">
        <ChartEntrateUscite entrate={totaleEntrate} uscite={totaleUscite} />
      </div>
    </div>
  )
}

export default SpeseContainer
