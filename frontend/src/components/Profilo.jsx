import { useState } from "react"
import { User, Mail, Lock, Pencil, Check, X } from "lucide-react"
import API from "../api"

const Profilo = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [editing, setEditing] = useState(false)
  const [nome, setNome] = useState(user?.nome || "")
  const [email, setEmail] = useState(user?.email || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!nome.trim() || !email.trim()) {
      return setError("Compila tutti i campi.")
    }

    try {
      setLoading(true)
      const res = await API.put("/user/update", { nome, email })

      localStorage.setItem("user", JSON.stringify(res.data.user))

      setSuccess("Profilo aggiornato con successo!")
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante l'aggiornamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 pt-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profilo</h2>

          {!editing ? (
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              onClick={() => setEditing(true)}
            >
              <Pencil size={16} /> Modifica
            </button>
          ) : null}
        </div>

        {!editing ? (
          <>
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
                <User className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Nome</p>
                  <p className="text-gray-800 font-semibold">{user?.nome}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-800 font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
                <Lock className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Password</p>
                  <p className="text-gray-800 font-semibold">••••••••</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
              <User className="w-6 h-6 text-gray-600" />
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 font-semibold"
                placeholder="Nome"
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border">
              <Mail className="w-6 h-6 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 font-semibold"
                placeholder="Email"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm font-semibold">{success}</p>
            )}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                <Check size={18} />
                {loading ? "Salvataggio..." : "Salva"}
              </button>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                <X size={18} />
                Annulla
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profilo
