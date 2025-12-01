import SpeseItem from "./SpeseItem"

const SpeseList = ({ title, spese, onDelete, onUpdate }) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-2xl border border-white/30 p-5 rounded-2xl shadow-xl flex-1
    max-h-80 overscroll-y-auto pr-3 transition-all"
    >
      <h2 className="text-xl font-semibold mb-3 text-black/90 tracking-wide">
        {title}
      </h2>
      {spese.length === 0 ? (
        <p className="text-black">Nessuna {title.toLowerCase()}</p>
      ) : (
        spese.map((item) => (
          <SpeseItem
            key={item._id}
            item={item}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  )
}

export default SpeseList
