import { useEffect, useState } from "react"
import SpesaForm from "./SpesaForm"
import SpeseContainer from "./SpeseContainer"
import API from "../api"

const Home = () => {
  const [spese, setSpese] = useState([])

  useEffect(() => {
    const fetchSpese = async () => {
      try {
        const res = await API.get("/spese")
        setSpese(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSpese()
  }, [])

  const handleNewSpesa = (spesa) => {
    setSpese((prev) => [spesa, ...prev])
  }

  const handleDelete = (id) => {
    setSpese((prev) => prev.filter((s) => s._id !== id))
  }

  const handleUpdate = (updatedSpesa) => {
    setSpese((prev) =>
      prev.map((s) => (s._id === updatedSpesa._id ? updatedSpesa : s))
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-500 p-6 gap-6 items-start">
      <div className="w-full md:w-1/3">
        <SpesaForm onNewSpesa={handleNewSpesa} />
      </div>
      <SpeseContainer
        spese={spese}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  )
}

export default Home
