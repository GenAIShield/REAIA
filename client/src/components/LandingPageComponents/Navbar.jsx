import { useState } from 'react';
import { User, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    window.location.href = path;
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  const handleChange = () => {
    navigate("/home")
  }

  // Function to handle logout
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    // Example: 
    // logout();
    handleNavigation('/');
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_less_logo-MmHmLy4bNZiqU2FVyjJt2IyMAN7qy6.png"
              alt="REAIA"
              className="h-8"
              onClick={handleChange}
              style={{cursor:'pointer'}}
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/home')} 
              className="text-gray-300 hover:text-cyan-500 px-3 py-2 text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/community')} 
              className="text-gray-300 hover:text-cyan-500 px-3 py-2 text-sm font-medium"
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation('/upcoming')} 
              className="text-gray-300 hover:text-cyan-500 px-3 py-2 text-sm font-medium"
            >
              Upcoming
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 focus:outline-none"
            >
              <User className="h-6 w-6" />
              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-md shadow-xl border border-gray-800 z-50">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation('/contributions')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
                >
                  My Contributions
                </button>
                <div className="border-t border-gray-800 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden px-4">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button focus:outline-none"
        >
          <Menu className="h-6 w-6 text-gray-300" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <button 
            onClick={() => handleNavigation('/home')}
            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation('/community')}
            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
          >
            Community
          </button>
          <button 
            onClick={() => handleNavigation('/upcoming')}
            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-cyan-500"
          >
            Upcoming
          </button>
        </div>
      )}
    </nav>
  );
}