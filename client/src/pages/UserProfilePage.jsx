'use client'

import { useState, useRef } from 'react'
import { Camera, Github, Linkedin, Mail, Twitter, User, X } from 'lucide-react'
import Navbar from '../components/LandingPageComponents/Navbar'

export default function UserProfilePage() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    image: null
  })

  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfile(prev => ({ ...prev, image: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Profile updated:', profile)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
        <Navbar />
    <div className="max-w-4xl mx-auto p-8">
      

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-40 w-40 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-50">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            {profile.image && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 bg-red-100 rounded-full p-2 hover:bg-red-200"
              >
                <X className="h-5 w-5 text-red-600" />
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50"
            >
              <Camera className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-sm text-gray-500">Click to upload new profile picture</p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>
        </div>

        {/* Username & Email */}
        <div className="space-y-8">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-4 text-gray-500 text-sm">
                @
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="block w-full rounded-none rounded-r-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 pl-12 px-4 py-3 text-gray-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-8">
          <h2 className="text-xl font-medium text-gray-900">Social Links</h2>

          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={profile.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="block w-full rounded-md border border-gray-300 pl-12 px-4 py-3 text-gray-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={profile.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="block w-full rounded-md border border-gray-300 pl-12 px-4 py-3 text-gray-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Twitter className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="twitterUrl"
                  name="twitterUrl"
                  value={profile.twitterUrl}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                  className="block w-full rounded-md border border-gray-300 pl-12 px-4 py-3 text-gray-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}