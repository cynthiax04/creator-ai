const express = require("express")
const router = express.Router()

const axios = require("axios")
const jwt = require("jsonwebtoken")

const Script = require("../models/Script")

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "No token provided"
      })

    }

    const token =
      authHeader.split(" ")[1]

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })

    }

    const decoded = jwt.verify(
      token,
      "secretkey"
    )

    req.userId = decoded.id

    next()

  } catch (error) {

    console.log(error.message)

    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })

  }

}

// GENERATE AI SCRIPT
router.post(
  "/generate",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        topic,
        niche,
        platform,
        style
      } = req.body

      const prompt = `
Generate a PREMIUM cinematic short-form content script.

IMPORTANT:
Return the ENTIRE response in MARKDOWN format.

Use headings like:
# VIDEO TITLE
# VIRAL HOOK
# FULL SCRIPT
# SCENE BREAKDOWN
# CALL TO ACTION
# HASHTAGS

Use markdown bold formatting:
**text**

Use markdown lists:
- item

TOPIC:
${topic}

NICHE:
${niche}

PLATFORM:
${platform}

STYLE:
${style}

Generate:

# VIDEO TITLE
(Create an ultra viral title)

# VIRAL HOOK
(Create an emotional viral hook)

# FULL SCRIPT
(Create a highly engaging cinematic short-form script)

Requirements:
- Add timestamps
- Add suspense hooks
- Add storytelling
- Add dialogue
- Add cinematic visuals
- Add creator-style editing cues

# SCENE BREAKDOWN

## Scene 1
**Visual:**  
**Camera Movement:**  
**Effects:**  
**Lighting:**  

## Scene 2
**Visual:**  
**Camera Movement:**  
**Effects:**  
**Lighting:**  

## Scene 3
**Visual:**  
**Camera Movement:**  
**Effects:**  
**Lighting:**  

# CALL TO ACTION
(Create strong CTA)

# HASHTAGS
(Add trending hashtags)

Make the output beautiful for markdown rendering.
`

      const response = await axios.post(

        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        }

      )

      const data =
        response.data.candidates?.[0]
        ?.content?.parts?.[0]?.text

      if (!data) {

        return res.status(500).json({
          success: false,
          message: "No AI response generated"
        })

      }

      // SAVE SCRIPT
      await Script.create({

        userId: req.userId,

        topic,
        niche,
        platform,
        style,
        content: data

      })

      res.json({

        success: true,
        data

      })

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      )

      res.status(500).json({

        success: false,
        message: "AI generation failed"

      })

    }

  }
)

// FETCH USER SCRIPTS
router.get(
  "/scripts",
  authMiddleware,
  async (req, res) => {

    try {

      const scripts =
        await Script.find({

          userId: req.userId

        }).sort({

          createdAt: -1

        })

      res.json({

        success: true,
        scripts

      })

    } catch (error) {

      console.log(
    error.response?.data ||
    error.message
  )

  res.status(500).json({

    success: false,

    message:
      error.response?.data?.error?.message ||
      error.message ||
      "AI generation failed"

  })

    }

  }
)

// DELETE SCRIPT
router.delete(
  "/scripts/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Script.findOneAndDelete({

        _id: req.params.id,
        userId: req.userId

      })

      res.json({

        success: true,
        message: "Script deleted"

      })

    } catch (error) {

      console.log(error.message)

      res.status(500).json({

        success: false,
        message: "Delete failed"

      })

    }

  }
)

module.exports = router