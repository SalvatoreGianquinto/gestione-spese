import { useState } from "react"
import API from "../api"
import {
  UserIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

const Profilo = () => {
  const userFromStorage = JSON.parse(localStorage.getItem("user"))

  const [user, setUser] = useState(userFromStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccesMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [form, setForm] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
  })

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">
          Effettua il login per vedere il tuo profilo.
        </p>
      </div>
    )
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await API.put("/user/update", form)

      localStorage.setItem("user", JSON.stringify(res.data.user))
      setUser(res.data.user)

      setErrorMessage("")
      setSuccesMessage("Profilo aggiornato con successo!")
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      setSuccesMessage("")
      setErrorMessage("Errore durante l’aggiornamento.")
    }
  }

  return (
    <div className="w-full p-6 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-2xl shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Il tuo profilo
        </h2>

        {successMessage && (
          <p className="text-green-600 text-sm font-semibold text-center mb-4">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-red-600 text-sm font-semibold text-center mb-4">
            {errorMessage}
          </p>
        )}

        <div className="space-y-5">
          <div className="flex items-center p-4 bg-gray-50 rounded-xl border shadow-sm">
            <UserIcon className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Nome
              </p>
              <p className="text-lg font-semibold text-gray-800">{user.nome}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl border shadow-sm">
            <EnvelopeIcon className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Email
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl border shadow-sm">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Stato Account
              </p>
              <p className="text-lg font-semibold text-green-700">Attivo</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow"
          >
            Modifica profilo
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Modifica profilo</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  className="w-1/2 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profilo
