import { Lock, User, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    research: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    // Here you would typically make an API call to register the user
    console.log('Form submitted:', formData)
    navigate('/') // Navigate to login page after successful registration
  }

  return (
    <div className="flex max-h-screen">
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-12 lg:px-16 bg-gray-50">
        <div className="mx-auto w-full max-w-lg">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              Create REAIA Account
            </h1>
            <p className="text-sm text-gray-500">
              Join our quantum research community
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 bg-white
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 bg-white
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="research" className="block text-sm font-medium text-gray-700">
                  Interest in Research
                </label>
                <div className="relative">
                  <select
                    id="research"
                    name="research"
                    value={formData.research}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-md border border-gray-300 py-2 px-3 pr-8 bg-white
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  >
                    <option value="">Select your interest</option>
                    <option value="quantum">Quantum Computing</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="robotics">Robotics</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 bg-white
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 bg-white
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                             shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 bg-white
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
                         focus:ring-cyan-500 hover:from-cyan-700 hover:to-cyan-800
                         transition-colors duration-200 shadow-sm"
              >
                Create Account
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <a 
                className="text-sm text-gray-600 hover:text-cyan-600 transition-colors duration-200" 
                href="/"
              >
                Already have an account? Sign in here!
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