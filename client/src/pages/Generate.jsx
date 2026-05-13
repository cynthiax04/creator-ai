import { useState } from "react"
import axios from "axios"
import Select from "react-select"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"

const Generate = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    topic: "",
    niche: "Technology",
    platform: "Instagram Reels",
    style: "Professional"
  })

  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateScript = async () => {

    setLoading(true)

    try {

      const response = await axios.post(
        "http://localhost:5000/api/ai/generate",
        formData
      )

      setResult(response.data.data)

    } catch (error) {

      console.log(error)
      setResult("Failed to generate script.")

    }

    setLoading(false)
  }

  const copyScript = () => {

    navigator.clipboard.writeText(result)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)

  }

  const nicheOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Fitness", label: "Fitness" },
    { value: "Finance", label: "Finance" },
    { value: "Gaming", label: "Gaming" },
    { value: "Food", label: "Food" },
    { value: "Fashion", label: "Fashion" },
    { value: "Travel", label: "Travel" },
    { value: "Education", label: "Education" },
    { value: "Luxury", label: "Luxury" },
    { value: "Business", label: "Business" },
    { value: "Health", label: "Health" },
    { value: "Sports", label: "Sports" },
    { value: "Cars", label: "Cars" },
    { value: "Motivation", label: "Motivation" },
    { value: "Lifestyle", label: "Lifestyle" }
  ]

  const platformOptions = [
    { value: "Instagram Reels", label: "Instagram Reels" },
    { value: "YouTube Shorts", label: "YouTube Shorts" },
    { value: "TikTok", label: "TikTok" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Twitter/X", label: "Twitter/X" },
    { value: "Facebook", label: "Facebook" }
  ]

  const styleOptions = [
    { value: "Professional", label: "Professional" },
    { value: "Funny", label: "Funny" },
    { value: "Motivational", label: "Motivational" },
    { value: "Cinematic", label: "Cinematic" },
    { value: "Luxury", label: "Luxury" },
    { value: "Storytelling", label: "Storytelling" },
    { value: "Emotional", label: "Emotional" },
    { value: "Dark Humor", label: "Dark Humor" },
    { value: "Minimal", label: "Minimal" },
    { value: "Dramatic", label: "Dramatic" },
    { value: "Gen-Z", label: "Gen-Z" },
    { value: "Horror", label: "Horror" },
    { value: "Documentary", label: "Documentary" },
    { value: "Educational", label: "Educational" },
    { value: "Sarcastic", label: "Sarcastic" },
    { value: "Inspirational", label: "Inspirational" },
    { value: "High Energy", label: "High Energy" },
    { value: "Aesthetic", label: "Aesthetic" }
  ]

  const customSelectStyles = {

    control: (base, state) => ({
      ...base,
      backgroundColor: "#09090b",
      borderColor: state.isFocused
        ? "#a3e635"
        : "#3f3f46",
      boxShadow: state.isFocused
        ? "0 0 20px rgba(163,230,53,0.35)"
        : "none",
      borderRadius: "18px",
      padding: "10px",
      minHeight: "60px",
      color: "white",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#09090b",
      borderRadius: "18px",
      overflow: "hidden",
      border: "1px solid #27272a",
      zIndex: 9999
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#a3e635"
        : "#09090b",

      color: state.isFocused
        ? "black"
        : "white",

      padding: "15px",
      cursor: "pointer",
      transition: "all 0.2s ease"
    }),

    singleValue: (base) => ({
      ...base,
      color: "white"
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#a3e635"
    }),

    indicatorSeparator: () => ({
      display: "none"
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "220px"
    })
  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-extrabold text-lime-400 tracking-wide">
          AI Script Generator
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="
            bg-zinc-900
            border
            border-zinc-700
            px-5
            py-3
            rounded-xl
            hover:border-lime-400
            transition
          "
        >
          Dashboard
        </button>

      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div
          className="
            bg-zinc-900/70
            backdrop-blur-lg
            border
            border-zinc-800
            rounded-3xl
            p-8
            shadow-2xl
          "
        >

          <h2 className="text-3xl font-bold mb-10 text-white">
            Generate Viral Content
          </h2>

          {/* Topic */}
          <div className="mb-6">

            <label className="block mb-3 text-zinc-400 text-lg">
              Topic
            </label>

            <input
              type="text"
              placeholder="AI in healthcare..."
              value={formData.topic}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  topic: e.target.value
                })
              }
              className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                p-4
                outline-none
                text-white
                focus:border-lime-400
                focus:ring-2
                focus:ring-lime-400/30
                transition-all
                duration-300
                hover:border-lime-400
              "
            />

          </div>

          {/* Niche */}
          <div className="mb-6">

            <label className="block mb-3 text-zinc-400 text-lg">
              Niche
            </label>

            <Select
              options={nicheOptions}
              defaultValue={nicheOptions[0]}
              styles={customSelectStyles}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  niche: selected.value
                })
              }
            />

          </div>

          {/* Platform */}
          <div className="mb-6">

            <label className="block mb-3 text-zinc-400 text-lg">
              Platform
            </label>

            <Select
              options={platformOptions}
              defaultValue={platformOptions[0]}
              styles={customSelectStyles}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  platform: selected.value
                })
              }
            />

          </div>

          {/* Style */}
          <div className="mb-8">

            <label className="block mb-3 text-zinc-400 text-lg">
              Content Style
            </label>

            <Select
              options={styleOptions}
              defaultValue={styleOptions[0]}
              styles={customSelectStyles}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  style: selected.value
                })
              }
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={generateScript}
            disabled={loading}
            className="
              w-full
              bg-lime-400
              text-black
              font-bold
              py-4
              rounded-2xl
              text-xl
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(163,230,53,0.7)]
              active:scale-95
              disabled:opacity-50
            "
          >

            {loading ? "Generating..." : "Generate Script"}

          </button>

        </div>

        {/* RIGHT */}
        <div
          className="
            bg-zinc-900/70
            backdrop-blur-lg
            border
            border-zinc-800
            rounded-3xl
            p-8
            shadow-2xl
          "
        >

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">
              Generated Output
            </h2>

            <div className="flex gap-3 items-center">

  {!result ? (

    <div className="flex items-center gap-3 bg-zinc-800 px-5 py-2 rounded-full border border-zinc-700">

      <div className="w-3 h-3 rounded-full bg-lime-400 animate-ping"></div>

      <span className="text-zinc-300 text-sm">
        Waiting For Prompt
      </span>

    </div>

  ) : (

    <div className="flex items-center gap-3 bg-lime-400/20 px-5 py-2 rounded-full border border-lime-400/20">

      <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse"></div>

      <span className="text-lime-400 text-sm font-semibold">
        AI Ready
      </span>

    </div>

  )}

  

              <button
                onClick={copyScript}
                className={`
                  px-4
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-105

                  ${
                    copied
                      ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.7)]"
                      : "bg-lime-400 text-black"
                  }
                `}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>

            </div>

          </div>

          <div
            className="
              bg-black
              border
              border-zinc-700
              rounded-2xl
              p-6
              h-[650px]
              overflow-y-auto
              leading-9
              text-zinc-300
            "
          >

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown
  components={{

    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold text-lime-400 mb-6 border-b border-lime-400/20 pb-3">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-pink-400 mt-10 mb-4 uppercase tracking-widest">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-cyan-300 mt-8 mb-3">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="text-zinc-200 leading-9 text-lg mb-5">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="text-white font-extrabold">
        {children}
      </strong>
    ),

    li: ({ children }) => (
      <li className="text-zinc-300 mb-3 leading-8">
        {children}
      </li>
    )

  }}
>
  {result || "Your AI generated script will appear here..."}
</ReactMarkdown>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Generate