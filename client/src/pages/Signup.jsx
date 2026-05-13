import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import bgImage from "../assets/bg.jpg"

const Signup = () => {

  const navigate = useNavigate()

  const [username, setUsername] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleSignup = async () => {

    try {

      setLoading(true)
      setError("")

      const response =
        await axios.post(

          "http://localhost:5000/api/auth/signup",

          {
            username,
            email,
            password
          }

        )

      if (response.data.success) {

        navigate("/")

      } else {

        setError(response.data.message)

        // AUTO REDIRECT
        if (
          response.data.message.includes(
            "exists"
          )
        ) {

          setTimeout(() => {

            navigate("/")

          }, 1500)

        }

      }

    } catch (error) {

      setError("Signup failed")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div
      className="
        min-h-screen
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
      "
      style={{
        backgroundImage:
          `url(${bgImage})`
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-lime-400/10 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div
        className="
          relative
          z-10
          w-[420px]
          bg-zinc-900/40
          backdrop-blur-xl
          border
          border-lime-400/20
          rounded-[32px]
          p-10
          shadow-[0_0_40px_rgba(163,230,53,0.15)]
        "
      >

        {/* LOGO */}
        <h1 className="text-6xl font-extrabold text-center text-lime-400 mb-4">
          CREATOR.AI
        </h1>

        <p className="text-zinc-400 text-center text-lg mb-8">
          Create your creator account
        </p>

        {/* ERROR */}
        {error && (

          <div
            className="
              mb-5
              bg-red-500/10
              border
              border-red-500/40
              text-red-300
              px-4
              py-3
              rounded-2xl
              text-sm
            "
          >
            {error}
          </div>

        )}

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
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
          "
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
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
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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
          "
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
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
          "
        >

          {loading
            ? "Creating..."
            : "Create Account →"}

        </button>

        {/* FOOTER */}
        <p className="text-zinc-500 text-center mt-8">

          Already have an account?

          <span
            onClick={() => navigate("/")}
            className="
              text-lime-400
              cursor-pointer
              ml-2
              hover:underline
            "
          >
            Login
          </span>

        </p>

      </div>

    </div>

  )

}

export default Signup