
import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { 
  LayoutDashboard, 
  Brain, 
  FileCheck, 
  Send, 
  Users, 
  UserCheck, 
  GitPullRequest, 
  Github,
  ChevronRight,
  Menu
} from 'lucide-react'
import InsightsPage from '../../pages/InsightsPage'
import EvaluatePage from '../../pages/EvaluatePage'
import PostResearchPage from '../../pages/PostResearchPage'

// Sample data for charts
const lineData = [
  { name: 'Mon', contributions: 12 },
  { name: 'Tue', contributions: 19 },
  { name: 'Wed', contributions: 15 },
  { name: 'Thu', contributions: 25 },
  { name: 'Fri', contributions: 32 },
  { name: 'Sat', contributions: 20 },
  { name: 'Sun', contributions: 18 },
]

const barData = [
  { name: 'Mon', users: 5 },
  { name: 'Tue', users: 8 },
  { name: 'Wed', users: 12 },
  { name: 'Thu', users: 7 },
  { name: 'Fri', users: 15 },
  { name: 'Sat', users: 6 },
  { name: 'Sun', users: 10 },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'insights':
        return (
          <InsightsPage />
        )
      case 'evaluate':
        return (
          <EvaluatePage />
        )
      case 'post':
        return (
          <PostResearchPage />
        )
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Metric Cards */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-xs text-gray-600">+12.5%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">2,543</h3>
                <p className="text-gray-600 text-sm">Registered Users</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-xs text-gray-600">+5.2%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">1,875</h3>
                <p className="text-gray-600 text-sm">Daily Active Users</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <GitPullRequest className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-xs text-gray-600">+8.7%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">12,789</h3>
                <p className="text-gray-600 text-sm">Total Contributions</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Github className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-xs text-gray-600">+15.3%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">3,456</h3>
                <p className="text-gray-600 text-sm">Open Source Contributions</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Contributions</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="contributions" 
                        stroke="#0891B2" 
                        strokeWidth={2}
                        dot={{ fill: '#0891B2' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Registered Users</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Bar dataKey="users" fill="#0891B2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 border-r border-gray-200`}>
        <div className="p-4">
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`flex w-full items-center space-x-2 px-4 py-2 rounded-lg ${
                activeSection === 'dashboard' 
                  ? 'text-cyan-600 bg-cyan-50' 
                  : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            
            <button 
              onClick={() => setActiveSection('insights')}
              className={`flex w-full items-center space-x-2 px-4 py-2 rounded-lg ${
                activeSection === 'insights' 
                  ? 'text-cyan-600 bg-cyan-50' 
                  : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              <Brain className="h-5 w-5" />
              {isSidebarOpen && <span>Insights</span>}
            </button>
            
            <button 
              onClick={() => setActiveSection('evaluate')}
              className={`flex w-full items-center space-x-2 px-4 py-2 rounded-lg ${
                activeSection === 'evaluate' 
                  ? 'text-cyan-600 bg-cyan-50' 
                  : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              <FileCheck className="h-5 w-5" />
              {isSidebarOpen && <span>Evaluate</span>}
            </button>
            
            <button 
              onClick={() => setActiveSection('post')}
              className={`flex w-full items-center space-x-2 px-4 py-2 rounded-lg ${
                activeSection === 'post' 
                  ? 'text-cyan-600 bg-cyan-50' 
                  : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              <Send className="h-5 w-5" />
              {isSidebarOpen && <span>Post</span>}
            </button>
          </nav>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute bottom-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <ChevronRight className={`h-5 w-5 text-gray-600 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  )
}