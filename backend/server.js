const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
