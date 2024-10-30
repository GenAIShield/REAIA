import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_less_logo-MmHmLy4bNZiqU2FVyjJt2IyMAN7qy6.png"
              alt="REAIA"
              className="h-8"
            />
            <p className="text-gray-400 text-sm">
              Explore research papers and their connections through our intuitive graph visualization interface.
              Transforming the way researchers connect and discover knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-cyan-500 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/features" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/documentation" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-400 hover:text-cyan-500 text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-cyan-500 text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 text-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
              />
              <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-r-md">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} REAIA. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}