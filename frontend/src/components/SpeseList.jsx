import SpeseItem from "./SpeseItem"

const SpeseList = ({ title, spese, onDelete, onUpdate }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg flex-1 min-h-[150px] flex flex-col justify-start items-start">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {spese.length === 0 ? (
        <p className="text-gray-500">Nessuna {title.toLowerCase()}</p>
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
