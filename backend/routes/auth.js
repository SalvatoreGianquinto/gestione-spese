const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.post("/register", async (req, res) => {
  try {
    const { nome, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(404).json({ message: "Utente già esistente" })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = new User({ nome, email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: "Utente registrato correttamente" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Errore del server" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res.status(404).json({ message: "Email o password errati" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(404).json({ message: "Email o password errati" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email },
    })
  } catch (error) {
    console.error(error)
    res.status(404).json("Errore del server")
  }
})

module.exports = router
