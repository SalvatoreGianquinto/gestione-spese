import { useState } from "react"
import API from "../api"
import { Pencil, Trash2 } from "lucide-react"

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
    <>
      <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg mb-3 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-black">{item.categoria}</p>
          <p className="text-md font-bold text-indigo-500">{item.importo} €</p>
          <p className="text-sm text-black/50">
            {new Date(item.data).toLocaleDateString("it-IT")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl bg-indigo-500/70 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 transition"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-red-500/70 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white/80 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Modifica transazione
            </h3>

            <div className="flex flex-col gap-4">
              <input
                value={form.categoria}
                onChange={(e) =>
                  setForm({ ...form, categoria: e.target.value })
                }
                className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/30 text-black font-semibold placeholder-white/40 outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Categoria"
              />

              <input
                type="number"
                value={form.importo}
                onChange={(e) => setForm({ ...form, importo: e.target.value })}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/30 text-black font-semibold placeholder-white/40 outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Importo"
              />

              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/30 text-black font-semibold placeholder-white/40 outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-600 transition active:scale-95"
                >
                  Salva
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-red-500/80 text-white rounded-xl font-semibold shadow-lg hover:bg-red-500 transition active:scale-95"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SpeseItem
