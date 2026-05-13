import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {

  const navigate = useNavigate()

  const [scripts, setScripts] = useState([])

  useEffect(() => {

    fetchScripts()

  }, [])

  const fetchScripts = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(

        "http://localhost:5000/api/ai/scripts",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setScripts(response.data.scripts)

    } catch (error) {

      console.log(error)

    }

  }

  const deleteScript = async (id) => {

    try {

      const token = localStorage.getItem("token")

      await axios.delete(

        `http://localhost:5000/api/ai/scripts/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      fetchScripts()

    } catch (error) {

      console.log(error)

    }

  }

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/")

  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-4xl font-bold text-lime-400">
          CREATOR.AI
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/generate")}
            className="
              bg-lime-400
              text-black
              px-6
              py-3
              rounded-xl
              font-bold
              hover:scale-105
              transition
            "
          >
            + New Script
          </button>

          <button
            onClick={logout}
            className="
              bg-zinc-900
              border
              border-red-500/30
              text-red-400
              px-6
              py-3
              rounded-xl
              font-bold
              hover:bg-red-500/10
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

          <h2 className="text-zinc-400 mb-2">
            Scripts Generated
          </h2>

          <p className="text-5xl font-bold text-lime-400">
            {scripts.length}
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

          <h2 className="text-zinc-400 mb-2">
            Total Scripts
          </h2>

          <p className="text-5xl font-bold text-lime-400">
            {scripts.length}
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

          <h2 className="text-zinc-400 mb-2">
            AI Status
          </h2>

          <p className="text-5xl font-bold text-lime-400">
            ON
          </p>

        </div>

      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">
        Previous Generated Scripts
      </h2>

      {/* Empty State */}
      {scripts.length === 0 && (

        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-10
            text-center
          "
        >

          <h2 className="text-3xl font-bold text-lime-400 mb-4">
            No Scripts Yet
          </h2>

          <p className="text-zinc-400 mb-8">
            Generate your first AI script now.
          </p>

          <button
            onClick={() => navigate("/generate")}
            className="
              bg-lime-400
              text-black
              px-6
              py-3
              rounded-xl
              font-bold
              hover:scale-105
              transition
            "
          >
            Generate Script
          </button>

        </div>

      )}

      {/* Scripts */}
      <div className="grid gap-6">

        {scripts.map((script) => (

          <div
            key={script._id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              p-6
              rounded-3xl
              hover:border-lime-400
              transition
            "
          >

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-2xl font-bold text-lime-400">
                {script.topic}
              </h3>

              <span
                className="
                  bg-lime-400/20
                  text-lime-400
                  px-4
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {script.style}
              </span>

            </div>

            <p className="text-zinc-400 mb-5">

              {script.content.slice(0, 250)}...

            </p>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() => navigate("/generate")}
                className="
                  bg-lime-400
                  text-black
                  px-4
                  py-2
                  rounded-xl
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Generate Again
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    script.content
                  )
                }
                className="
                  bg-zinc-800
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-zinc-700
                  transition
                "
              >
                Copy
              </button>

              <button
                onClick={() =>
                  deleteScript(script._id)
                }
                className="
                  bg-red-500/20
                  text-red-400
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-red-500/30
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Dashboard