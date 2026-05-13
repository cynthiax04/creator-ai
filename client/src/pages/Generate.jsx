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

      const token = localStorage.getItem("token")

      const response = await axios.post(

        "https://creator-ai-vqnf.onrender.com/api/ai/generate",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

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
    { value: "Education", label: "Education" }
  ]

  const platformOptions = [
    { value: "Instagram Reels", label: "Instagram Reels" },
    { value: "YouTube Shorts", label: "YouTube Shorts" },
    { value: "TikTok", label: "TikTok" }
  ]

  const styleOptions = [
    { value: "Professional", label: "Professional" },
    { value: "Funny", label: "Funny" },
    { value: "Motivational", label: "Motivational" },
    { value: "Cinematic", label: "Cinematic" }
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
      color: "white"
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#09090b",
      borderRadius: "18px",
      overflow: "hidden",
      border: "1px solid #27272a"
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#a3e635"
        : "#09090b",

      color: state.isFocused
        ? "black"
        : "white",

      padding: "15px"
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
    })

  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-extrabold text-lime-400">
          AI Script Generator
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-xl hover:border-lime-400 transition"
        >
          Dashboard
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-10">
            Generate Viral Content
          </h2>

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
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white focus:border-lime-400"
            />

          </div>

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

          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full bg-lime-400 text-black font-bold py-4 rounded-2xl text-xl hover:scale-[1.02] transition"
          >

            {loading ? "Generating..." : "Generate Script"}

          </button>

        </div>

        {/* RIGHT */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">
              Generated Output
            </h2>

            <button
              onClick={copyScript}
              className="bg-lime-400 text-black px-4 py-2 rounded-xl font-semibold"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>

          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-6 h-[650px] overflow-y-auto text-zinc-300">

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown>
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