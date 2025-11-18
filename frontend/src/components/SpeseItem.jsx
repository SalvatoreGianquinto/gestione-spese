import { useState } from "react"
import API from "../api"

const SpeseItem = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    categoria: item.categoria,
    importo: item.importo,
    data: item.data,
  })

  const handleSave = async () => {
    try {
      const res = await API.put(`/spese/${item._id}`, form)
      onUpdate(res.data)
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/spese/${item._id}`)
      onDelete(item._id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-2 rounded-lg mb-2 w-full">
      {!isEditing ? (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">{form.categoria}</p>
            <p className="text-lg font-bold">{form.importo} €</p>
            <p className="text-sm text-gray-500">
              {new Date(form.data).toLocaleDateString("it-IT")}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Modifica
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Cancella
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="border border-gray-300 rounded-xl p-1 font-semibold"
          />
          <input
            type="number"
            value={form.importo}
            onChange={(e) => setForm({ ...form, importo: e.target.value })}
            className="border border-gray-300 rounded-xl p-1 font-semibold"
          />
          <input
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            className="border border-gray-300 rounded-xl p-1 font-semibold"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-400 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeseItem
