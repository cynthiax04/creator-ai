const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

require("dotenv").config()

const aiRoutes = require("./routes/aiRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log(err)
})

// API ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/ai", aiRoutes)

// SERVE FRONTEND
app.use(
  express.static(
    path.join(__dirname, "../client/dist")
  )
)

// REACT ROUTING FIX
app.get("/*splat", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "../client/dist/index.html"
    )
  )

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})