import SpeseList from "./SpeseList"

const SpeseContainer = ({ spese, onDelete, onUpdate }) => {
  const entrate = spese.filter((s) => s.tipo === "entrata")
  const uscite = spese.filter((s) => s.tipo === "uscita")

  return (
    <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4">
      <SpeseList
        title="Entrate"
        spese={entrate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <SpeseList
        title="Uscite"
        spese={uscite}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export default SpeseContainer
