import { CircuitBoard, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add any login logic here
    navigate('/home')
  }

  return (
    <div className="flex max-h-screen">
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-12 lg:px-16 bg-gray-50">
        <div className="mx-auto w-full max-w-lg">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              Welcome to REAIA
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to access your quantum dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label 
                  htmlFor="userid" 
                  className="block text-sm font-medium text-gray-700"
                >
                  User ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="userid"
                    placeholder="Enter your user ID"
                    className="w-full rounded-md border border-gray-300 bg-white pl-10 py-2 px-3 
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 bg-white pl-10 py-2 px-3 
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-cyan-600 to-cyan-700 
                         text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-cyan-500 hover:from-cyan-700 hover:to-cyan-800 shadow-sm
                         transition-colors duration-200"
              >
                Sign In
              </button>
            </div>

            <div className="flex items-center justify-center">
              <a 
                className="text-sm text-gray-600 hover:text-cyan-600 transition-colors duration-200" 
                href="/register"
              >
                Don't have an account? Register here!
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden bg-black md:block md:w-1/2">
        <div className="relative flex h-full items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-cyan-900/20" />
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-29%20at%2016.23.56_9d939660-pW26DRFILUzmu4pKEl3EGpwnCklhLS.jpg"
            alt="REAIA Quantum Mind"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}