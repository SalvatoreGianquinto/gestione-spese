import { useEffect, useState } from "react"
import SpesaForm from "./SpesaForm"
import SpeseContainer from "./SpeseContainer"
import API from "../api"
import Header from "../Header"

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
    <>
      <Header spese={spese} />
      <div className="w-full min-h-screen bg-gray-500 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <SpesaForm onNewSpesa={handleNewSpesa} />
          </div>
          <SpeseContainer
            spese={spese}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </>
  )
}

export default Home
