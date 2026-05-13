import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import bgImage from "../assets/bg.jpg"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    try {

      setLoading(true)
      setError("")

      const response = await axios.post(
        "https://creator-ai-vqnf.onrender.com/api/auth/login",
        {
          email,
          password
        }
      )

      // SUCCESS LOGIN
      if (response.data.success) {

        localStorage.setItem(
          "token",
          response.data.token
        )

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        )

        navigate("/dashboard")

      }

    } catch (error) {

      // BACKEND ERROR MESSAGE
      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-lime-400/10 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-[420px] bg-zinc-900/40 backdrop-blur-xl border border-lime-400/20 rounded-[32px] p-10 shadow-[0_0_40px_rgba(163,230,53,0.15)]">

        {/* LOGO */}
        <h1 className="text-6xl font-extrabold text-center text-lime-400 mb-4">
          CREATOR.AI
        </h1>

        <p className="text-zinc-400 text-center text-lg mb-10">
          Level up your short-form game
        </p>

        {/* ERROR MESSAGE */}
        {error && (

          <div
            className="
              mb-5
              bg-red-500/10
              border
              border-red-500/30
              text-red-400
              px-4
              py-3
              rounded-2xl
              text-sm
              backdrop-blur-md
              shadow-[0_0_20px_rgba(239,68,68,0.15)]
              animate-pulse
            "
          >
            {error}
          </div>

        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            bg-black/70
            border
            border-zinc-700
            rounded-2xl
            px-5
            py-4
            text-white
            mb-5
            outline-none
            focus:border-lime-400
            transition
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            bg-black/70
            border
            border-zinc-700
            rounded-2xl
            px-5
            py-4
            text-white
            mb-8
            outline-none
            focus:border-lime-400
            transition
          "
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            bg-lime-400
            text-black
            font-bold
            py-4
            rounded-2xl
            text-xl
            hover:scale-[1.02]
            transition
            duration-300
            shadow-[0_0_25px_rgba(163,230,53,0.5)]
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
        >

          {loading
            ? "Checking..."
            : "Get Started →"}

        </button>

        {/* FOOTER */}
        <p className="text-zinc-500 text-center mt-8">

          Don’t have an account?

          <span
            onClick={() => navigate("/signup")}
            className="
              text-lime-400
              cursor-pointer
              ml-2
              hover:underline
            "
          >
            Sign up
          </span>

        </p>

      </div>

    </div>

  )

}

export default Login