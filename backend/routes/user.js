const router = require("express").Router()
const User = require("../models/User")
const verifyToken = require("../middleware/verifyToken")

router.put("/update", verifyToken, async (req, res) => {
  try {
    const { nome, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ message: " Nome ed email sono richiesti" })
    }

    const updateUser = await User.findByIdAndUpdate(
      req.userId,
      { nome, email },
      { new: true }
    )
    res.json({
      message: "Profilo aggiornato",
      user: {
        nome: updateUser.nome,
        email: updateUser.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Errore aggiornamento profilo" })
  }
})

module.exports = router
