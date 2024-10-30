import { Network, MessageSquare, BarChart3, ArrowRight, Share2, Brain, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HeroComponent() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/solution')
    }
    const handleLearnmore = () => {
        navigate('/documentation')
    }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Discover Research Connections with REAIA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Explore research papers and their connections through our intuitive graph visualization interface
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-3 rounded-full font-medium flex items-center gap-2" onClick={handleNavigate}>
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-cyan-500 hover:bg-cyan-500/10 px-8 py-3 rounded-full font-medium flex items-center gap-2" onClick={handleLearnmore}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Graph Visualization */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <Network className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Dynamic Graph Visualization</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-cyan-500" />
                Force-directed graphs
              </li>
              <li className="flex items-center gap-2">
                <Network className="h-4 w-4 text-cyan-500" />
                Paper relationship mapping
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-500" />
                Visual citation networks
              </li>
            </ul>
          </div>

          {/* Smart Document Chat */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Document Chat</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-500" />
                Context-aware conversations
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-cyan-500" />
                Deep document understanding
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-cyan-500" />
                Multi-document queries
              </li>
            </ul>
          </div>

          {/* Self-Evaluation Tools */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Self-Evaluation Tools</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-500" />
                Relevance scoring
              </li>
              <li className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-500" />
                Readability analysis
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-500" />
                Impact assessment
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Research Experience?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join REAIA today and discover new connections in your research field
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-3 rounded-full font-medium flex items-center gap-2 mx-auto">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}