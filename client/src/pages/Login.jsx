import { useNavigate } from "react-router-dom"
import bgImage from "../assets/bg.jpg"

const Login = () => {

  const navigate = useNavigate()

  return (

    <div
  className="min-h-screen relative flex items-center justify-center overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `url(${bgImage})`
  }}
>
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-lime-400/10 blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-[420px] bg-zinc-900/40 backdrop-blur-xl border border-lime-400/20 rounded-[32px] p-10 shadow-[0_0_40px_rgba(163,230,53,0.15)]">

        {/* Logo */}
        <h1 className="text-6xl font-extrabold text-center text-lime-400 mb-4">
          CREATOR.AI
        </h1>

        <p className="text-zinc-400 text-center text-lg mb-10">
          Level up your short-form game
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
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

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
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

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard")}
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
          Get Started →
        </button>

        {/* Footer */}
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