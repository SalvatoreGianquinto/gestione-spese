const express = require("express")
const router = express.Router()
const Spesa = require("../models/Spese")
const verifyToken = require("../middleware/verifyToken")

router.get("/", verifyToken, async (req, res) => {
  try {
    const spese = await Spesa.find({ utenteId: req.userId }).sort({ data: -1 })
    res.status(200).json(spese)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post("/", verifyToken, async (req, res) => {
  const { tipo, categoria, importo, data } = req.body
  try {
    const nuovaSpesa = new Spesa({
      utenteId: req.userId,
      tipo,
      categoria,
      importo,
      data,
    })
    const savedSpesa = await nuovaSpesa.save()
    res.status(201).json(savedSpesa)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const spesa = await Spesa.findById(req.params.id)
    if (!spesa) return res.status(404).json({ message: "Spesa non trovata" })
    if (spesa.utenteId.toString() !== req.userId)
      return res.status(403).json({ message: "Non autorizzato" })

    const uptadeSpesa = await Spesa.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(uptadeSpesa)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const spesa = await Spesa.findById(req.params.id)
    if (!spesa) return res.status(404).json({ message: "Spesa non trovata" })
    if (spesa.utenteId.toString() !== req.userId)
      return res.status(403).json({ message: "Non autorizzato" })

    await Spesa.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Spesa eliminata" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
