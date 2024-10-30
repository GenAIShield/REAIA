import { useState, useEffect } from 'react'
import { X, Upload, FileText, Download } from 'lucide-react'

export default function Component() {
  const [topic, setTopic] = useState('')
  const [context, setContext] = useState('')
  const [researchFile, setResearchFile] = useState(null)
  const [resultFile, setResultFile] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('insight')
  const [showToast, setShowToast] = useState(false)

  const handleResearchUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResearchFile({
        name: file.name,
        url: URL.createObjectURL(file)
      })
    }
  }

  const handleResultUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResultFile({
        name: file.name,
        url: URL.createObjectURL(file)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowToast(true)
    await new Promise(resolve => setTimeout(resolve, 5000))
    setShowToast(false)
    setShowResults(true)
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {showToast && (
        <div className="fixed top-4 right-4 bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          Analyzing Research... Please wait
        </div>
      )}

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Evaluate my Research
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-lg font-medium text-gray-700">
            Topic
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value.slice(0, 50))}
            placeholder="Enter your research topic"
            className="w-full min-h-[80px] text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600"
            maxLength={50}
          />
          <p className="text-sm text-gray-500 text-right">
            {topic.length}/50 words
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="context" className="block text-lg font-medium text-gray-700">
            Context
          </label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value.slice(0, 300))}
            placeholder="Provide context for your research"
            className="w-full min-h-[200px] text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600"
            maxLength={300}
          />
          <p className="text-sm text-gray-500 text-right">
            {context.length}/300 words
          </p>
        </div>

        <div className="space-y-2">
          <span className="block text-lg font-medium text-gray-700">
            Upload Research Work (PDF)*
          </span>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors hover:border-cyan-600">
            <input
              type="file"
              id="research"
              accept=".pdf"
              className="hidden"
              onChange={handleResearchUpload}
            />
            <label
              htmlFor="research"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <Upload className="h-10 w-10 text-cyan-600" />
              <span className="text-lg text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500">PDF (max. 10MB)</span>
            </label>
          </div>
          {researchFile && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-cyan-600" />
              <span className="text-sm text-gray-600 flex-1">
                {researchFile.name}
              </span>
              <button
                type="button"
                onClick={() => setResearchFile(null)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <span className="block text-lg font-medium text-gray-700">
            Upload Result (Optional)
          </span>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors hover:border-cyan-600">
            <input
              type="file"
              id="result"
              accept=".pdf"
              className="hidden"
              onChange={handleResultUpload}
            />
            <label
              htmlFor="result"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <Upload className="h-10 w-10 text-cyan-600" />
              <span className="text-lg text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500">PDF (max. 10MB)</span>
            </label>
          </div>
          {resultFile && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-cyan-600" />
              <span className="text-sm text-gray-600 flex-1">
                {resultFile.name}
              </span>
              <button
                type="button"
                onClick={() => setResultFile(null)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!topic || !context || !researchFile}
        >
          Evaluate
        </button>
      </form>

      {showResults && (
        <div className="space-y-6 mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg">
              <Download className="h-4 w-4" />
              Generate Report
            </button>
          </div>
          
          <div className="w-full">
            <div className="flex border-b border-gray-200">
              {['insight', 'relevancy', 'piracy', 'readability', 'analyzer'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-4 text-center capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-cyan-600 text-cyan-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === 'insight' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Insights</h3>
                  <p className="text-gray-600 mb-4">Key findings and analysis of your research</p>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-cyan-900">Key Points</h4>
                    <ul className="list-disc list-inside mt-2 text-cyan-800">
                      <li>Strong methodology and research design</li>
                      <li>Clear objectives and research questions</li>
                      <li>Comprehensive literature review</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'relevancy' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Relevancy Analysis</h3>
                  <p className="text-gray-600 mb-4">Assessment of research relevance to the field</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Topic Relevance</span>
                      <span className="text-cyan-600 font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-cyan-600 h-2.5 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'piracy' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Plagiarism Detection</h3>
                  <p className="text-gray-600 mb-4">Originality and citation analysis</p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Originality Score: 98%</h4>
                    <p className="mt-2 text-green-800">
                      Your research demonstrates high originality with proper citations
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'readability' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Readability Metrics</h3>
                  <p className="text-gray-600 mb-4">Analysis of writing clarity and accessibility</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-cyan-600">85/100</div>
                      <div className="text-sm text-gray-600">Flesch Reading Ease</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-cyan-600">Grade 12</div>
                      <div className="text-sm text-gray-600">Reading Level</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analyzer' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Result Analysis</h3>
                  <p className="text-gray-600 mb-4">Detailed analysis of research outcomes</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Methodology Strength</h4>
                      <p className="mt-2 text-gray-600">
                        The research methodology demonstrates strong alignment with objectives
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Data Analysis</h4>
                      <p className="mt-2 text-gray-600">
                        Statistical analysis shows significant results with p{'<'}0.05
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}