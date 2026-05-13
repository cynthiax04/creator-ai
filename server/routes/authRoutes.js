const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

// SIGNUP
router.post("/signup", async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body

    // CHECK USERNAME
    const existingUsername =
      await User.findOne({ username })

    if (existingUsername) {

      return res.json({
        success: false,
        message: "Username already exists"
      })

    }

    // CHECK EMAIL
    const existingEmail =
      await User.findOne({ email })

    if (existingEmail) {

      return res.json({
        success: false,
        message:
          "Account already exists. Redirecting to login..."
      })

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // CREATE USER
    const user = await User.create({

      username,
      email,
      password: hashedPassword

    })

    res.json({
      success: true,
      message: "Account created successfully",
      user
    })

  } catch (error) {

    console.log(error.message)

    res.status(500).json({
      success: false,
      message: "Signup failed"
    })

  }

})

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    // FIND USER
    const user =
      await User.findOne({ email })

    if (!user) {

      return res.json({
        success: false,
        message:
          "Account not found. Please sign up first."
      })

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Incorrect password"
      })

    }

    // TOKEN
    const token = jwt.sign(

      {
        id: user._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }

    )

    res.json({
      success: true,
      token,
      user
    })

  } catch (error) {

    console.log(error.message)

    res.status(500).json({
      success: false,
      message: "Login failed"
    })

  }

})

module.exports = router