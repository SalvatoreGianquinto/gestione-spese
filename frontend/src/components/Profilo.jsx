import { useState } from "react"
import {
  UserIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

const Profilo = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")))

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">
          Effettua il login per vedere il tuo profilo.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-2xl shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Il tuo profilo
        </h2>

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
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow">
            Modifica profilo
          </button>

          <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition shadow">
            Cambia password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profilo
