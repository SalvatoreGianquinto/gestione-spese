const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.log("Errore connessione MongoDB:", err))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`)
})
