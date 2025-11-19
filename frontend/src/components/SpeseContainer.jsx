import SpeseList from "./SpeseList"

const SpeseContainer = ({ spese, onDelete, onUpdate }) => {
  const entrate = spese.filter((s) => s.tipo === "entrata")
  const uscite = spese.filter((s) => s.tipo === "uscita")

  const totaleEntrate = entrate.reduce(
    (sum, item) => sum + Number(item.importo),
    0
  )

  const totaleUscite = uscite.reduce(
    (sum, item) => sum + Number(item.importo),
    0
  )

  return (
    <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4">
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
  )
}

export default SpeseContainer
