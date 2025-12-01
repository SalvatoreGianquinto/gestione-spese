const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

const corsOptions = {
  origin: "https://gestione-spese-fawn.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))

app.use(express.json())

const authRoutes = require("./routes/auth")
app.use("/", authRoutes)

const speseRoutes = require("./routes/spese")
app.use("/spese", speseRoutes)

const userRoutes = require("./routes/user")
app.use("/user", userRoutes)

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.log("Errore connessione MongoDB:", err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`)
})
