const mongoose = require("mongoose")

const scriptSchema = new mongoose.Schema(

  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    topic: String,

    niche: String,

    platform: String,

    style: String,

    content: String

  },

  {
    timestamps: true
  }

)

module.exports =
  mongoose.model("Script", scriptSchema)