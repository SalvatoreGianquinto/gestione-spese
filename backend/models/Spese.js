const mongoose = require("mongoose")

const SpesaSchema = new mongoose.Schema({
  utenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tipo: {
    type: String,
    enum: ["entrata", "uscita"],
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  importo: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model("Spesa", SpesaSchema)
