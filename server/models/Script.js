const mongoose = require("mongoose")

const scriptSchema = new mongoose.Schema({
  topic: String,
  niche: String,
  platform: String,
  style: String,
  content: String,
}, {
  timestamps: true
})

module.exports = mongoose.model("Script", scriptSchema)