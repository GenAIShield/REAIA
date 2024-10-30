

// import { useState, useEffect } from 'react'
// import { X, Upload, Send as SendIcon } from 'lucide-react'

// const InsightsPage = () => {
//   const [topic, setTopic] = useState('')
//   const [context, setContext] = useState('')
//   const [selectedType, setSelectedType] = useState('')
//   const [uploadedFiles, setUploadedFiles] = useState([])
//   const [url, setUrl] = useState('')
//   const [showResults, setShowResults] = useState(false)
//   const [activeTab, setActiveTab] = useState('visualization')
//   const [showChat, setShowChat] = useState(false)
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState('')

//   // Initialize welcome messages with delay
//   useEffect(() => {
//     if (showChat) {
//       // First message
//       setTimeout(() => {
//         setMessages([{ text: "Welcome to RAEAI", isBot: true }])
//       }, 500)

//       // Second message
//       setTimeout(() => {
//         setMessages(prev => [...prev, { text: "How can I help you today?", isBot: true }])
//       }, 1500)
//     }
//   }, [showChat])

//   // Handler for topic input with word limit
//   const handleTopicChange = (e) => {
//     const words = e.target.value.trim().split(/\s+/)
//     if (words.length <= 50) {
//       setTopic(e.target.value)
//     }
//   }

//   // Handler for context input with word limit
//   const handleContextChange = (e) => {
//     const words = e.target.value.trim().split(/\s+/)
//     if (words.length <= 300) {
//       setContext(e.target.value)
//     }
//   }

//   // Handle file upload
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files)
//     setUploadedFiles([...uploadedFiles, ...files])
//   }

//   // Remove file
//   const removeFile = (fileName) => {
//     setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName))
//   }

//   // Handle form submission
//   const handleSubmit = () => {
//     setShowResults(true)
//   }

//   // Handle sending new message
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages(prev => [...prev, { text: newMessage, isBot: false }])
//       setNewMessage('')
//     }
//   }

//   // Handle enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   // Calculate remaining words
//   const topicWordsRemaining = 50 - (topic.trim() ? topic.trim().split(/\s+/).length : 0)
//   const contextWordsRemaining = 300 - (context.trim() ? context.trim().split(/\s+/).length : 0)

//   // Render type-specific content
//   const renderTypeContent = () => {
//     switch (selectedType) {
//       case 'document':
//         return (
//           <div className="mb-8">
//             {/* File Upload Area */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
//               <input
//                 type="file"
//                 id="fileUpload"
//                 multiple
//                 accept=".pdf,.docx"
//                 onChange={handleFileUpload}
//                 className="hidden"
//               />
//               <label 
//                 htmlFor="fileUpload"
//                 className="flex flex-col items-center cursor-pointer"
//               >
//                 <Upload className="h-12 w-12 text-gray-400 mb-2" />
//                 <span className="text-gray-600">Drop files here or click to upload</span>
//                 <span className="text-sm text-gray-500 mt-1">Supports PDF and DOCX</span>
//               </label>
//             </div>

//             {/* Uploaded Files List */}
//             {uploadedFiles.length > 0 && (
//               <div className="space-y-2 mb-4">
//                 {uploadedFiles.map((file) => (
//                   <div key={file.name} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                     <span className="text-sm text-gray-600">{file.name}</span>
//                     <button
//                       onClick={() => removeFile(file.name)}
//                       className="text-gray-500 hover:text-red-500"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )
//       case 'url':
//         return (
//           <div className="mb-8">
//             <input
//               type="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="https://example.com"
//               className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
//             />
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   // Render tab content
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'visualization':
//         return <div className="text-gray-600">Data Visualization Content</div>
//       case 'summary':
//         return <div className="text-gray-600">Insights Summary Content</div>
//       case 'trends':
//         return <div className="text-gray-600">Future Trends Content</div>
//       case 'chat':
//         return (
//           <div className="flex flex-col items-center">
//             {!showChat ? (
//               <button
//                 onClick={() => setShowChat(true)}
//                 className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-base font-medium"
//               >
//                 Start Chat with RAEAI
//               </button>
//             ) : (
//               <div className="w-full max-w-4xl">
//                 {/* Chat Container */}
//                 <div className="bg-gray-50 rounded-lg border border-gray-200 h-[500px] flex flex-col">
//                   {/* Chat Messages */}
//                   <div className="flex-1 p-4 overflow-y-auto">
//                     {messages.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`mb-4 ${message.isBot ? '' : 'flex justify-end'}`}
//                       >
//                         <div
//                           className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
//                             message.isBot
//                               ? 'bg-white border border-gray-200'
//                               : 'bg-cyan-600 text-white'
//                           }`}
//                         >
//                           {message.text}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Chat Input */}
//                   <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
//                     <div className="flex space-x-4">
//                       <input
//                         type="text"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         placeholder="Type your message..."
//                         className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
//                       />
//                       <button
//                         onClick={handleSendMessage}
//                         disabled={!newMessage.trim()}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <SendIcon className="h-5 w-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="p-8 w-full">
//       {/* Title Section */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Search - Find - Insight</h1>
//       </div>

//       {/* Form Container */}
//       <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-6xl mx-auto">
//         {/* Topic Input */}
//         <div className="mb-8">
//           <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
//             Topic
//           </label>
//           <div className="relative">
//             <textarea
//               id="topic"
//               value={topic}
//               onChange={handleTopicChange}
//               rows={2}
//               className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
//               placeholder="Enter your topic here..."
//             />
//             <div className="absolute right-3 bottom-3 text-xs text-gray-500">
//               {topicWordsRemaining} words remaining
//             </div>
//           </div>
//         </div>

//         {/* Context Input */}
//         <div className="mb-8">
//           <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
//             Context
//           </label>
//           <div className="relative">
//             <textarea
//               id="context"
//               value={context}
//               onChange={handleContextChange}
//               rows={8}
//               className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
//               placeholder="Enter your context here..."
//             />
//             <div className="absolute right-3 bottom-3 text-xs text-gray-500">
//               {contextWordsRemaining} words remaining
//             </div>
//           </div>
//         </div>

//         {/* Type Dropdown */}
//         <div className="mb-8">
//           <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//             Select Type
//           </label>
//           <select
//             id="type"
//             value={selectedType}
//             onChange={(e) => setSelectedType(e.target.value)}
//             className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
//           >
//             <option value="">--select--</option>
//             <option value="document">Document Available</option>
//             <option value="url">URL Known</option>
//             <option value="any">Any</option>
//           </select>
//         </div>

//         {/* Conditional Content Based on Type */}
//         {renderTypeContent()}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-base font-medium"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Results Section */}
//       {showResults && (
//         <div className="mt-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-6xl mx-auto">
//           {/* Tabs */}
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8">
//               <button
//                 onClick={() => setActiveTab('visualization')}
//                 className={`pb-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'visualization'
//                     ? 'border-cyan-500 text-cyan-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Data-Visualization
//               </button>
//               <button
//                 onClick={() => setActiveTab('summary')}
//                 className={`pb-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'summary'
//                     ? 'border-cyan-500 text-cyan-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Insights Summary
//               </button>
//               <button
//                 onClick={() => setActiveTab('trends')}
//                 className={`pb-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'trends'
//                     ? 'border-cyan-500 text-cyan-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Future Trends
//               </button>
//               <button
//                 onClick={() => setActiveTab('chat')}
//                 className={`pb-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'chat'
//                     ? 'border-cyan-500 text-cyan-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Chat Service
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-8">
//             {renderTabContent()}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default InsightsPage

import { useState, useEffect, useRef } from 'react'
import { 
  X, 
  Upload, 
  Send as SendIcon,
  ExternalLink,
  PlusCircle,
  MessageSquare,
  Clock,
} from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const InsightsPage = () => {
  // State declarations
  const [topic, setTopic] = useState('')
  const [context, setContext] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [url, setUrl] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('visualization')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [savedChats, setSavedChats] = useState([])
  const messagesEndRef = useRef(null)

  // Auto-scroll when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (showChat) {
      setTimeout(() => {
        setMessages([{ text: "Welcome to RAEAI", isBot: true }])
      }, 500)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "How can I help you today?", isBot: true }])
      }, 1500)
    }
  }, [showChat])

  // Topic input handler
  const handleTopicChange = (e) => {
    const words = e.target.value.trim().split(/\s+/)
    if (words.length <= 50) {
      setTopic(e.target.value)
    }
  }

  // Context input handler
  const handleContextChange = (e) => {
    const words = e.target.value.trim().split(/\s+/)
    if (words.length <= 300) {
      setContext(e.target.value)
    }
  }

  // File upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles([...uploadedFiles, ...files])
    toast.info('Files uploaded successfully!')
  }

  // Remove file handler
  const handleFileRemove = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName))
    toast.info('File removed')
  }

  // Form submission handler
  const handleSubmit = () => {
    setShowResults(true)
    toast.success('Analysis started!')
  }

  // Message sending handler
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, { text: newMessage, isBot: false }])
      setNewMessage('')
    }
  }

  // Enter key handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // New chat handler
  const handleNewChat = () => {
    setMessages([])
    setShowChat(true)
    setTimeout(() => {
      setMessages([{ text: "Welcome to RAEAI", isBot: true }])
    }, 500)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "How can I help you today?", isBot: true }])
    }, 1500)
    toast.info('Started new chat')
  }

  // Save chat handler
  const handleSaveChat = () => {
    if (messages.length > 0) {
      const newChat = {
        id: savedChats.length + 1,
        messages: messages,
        timestamp: new Date().toLocaleString(),
        preview: messages[messages.length - 1].text
      }
      setSavedChats(prev => [newChat, ...prev])
      toast.success('Chat saved successfully!')
    }
  }

  // Calculate remaining words
  const topicWordsRemaining = 50 - (topic.trim() ? topic.trim().split(/\s+/).length : 0)
  const contextWordsRemaining = 300 - (context.trim() ? context.trim().split(/\s+/).length : 0)

  // Render type-specific content
  const renderTypeContent = () => {
    switch (selectedType) {
      case 'document':
        return (
          <div className="mb-8">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <input
                type="file"
                id="fileUpload"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label 
                htmlFor="fileUpload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-gray-600">Drop files here or click to upload</span>
                <span className="text-sm text-gray-500 mt-1">Supports PDF and DOCX</span>
              </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                {uploadedFiles.map((file) => (
                  <div key={file.name} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      onClick={() => handleFileRemove(file.name)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      case 'url':
        return (
          <div className="mb-8">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
            />
          </div>
        )
      default:
        return null
    }
  }

  // Render chat content
  const renderChatContent = () => (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleNewChat}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-sm font-medium flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          New Chat
        </button>
      </div>

      {!showChat ? (
        <button
          onClick={() => setShowChat(true)}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-base font-medium"
        >
          Start Chat with RAEAI
        </button>
      ) : (
        <div className="w-full">
          <div className="bg-gray-50 rounded-lg border border-gray-200 h-[500px] flex flex-col">
            <div className="border-b border-gray-200 p-4 bg-white rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Chat with RAEAI</h3>
              <button
                onClick={handleSaveChat}
                className="px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-sm font-medium"
              >
                Save Chat
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.isBot ? '' : 'flex justify-end'}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                      message.isBot
                        ? 'bg-white border border-gray-200'
                        : 'bg-cyan-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SendIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Render history content
  const renderHistoryContent = () => (
    <div className="w-full space-y-6">
      {savedChats.map((chat) => (
        <div key={chat.id} className="group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-600" />
              <span className="text-gray-900">Chat {chat.id}</span>
            </div>
            <button
              onClick={() => window.open('#', '_blank')}
              className="text-gray-400 hover:text-cyan-600"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {chat.timestamp}
          </div>
          <div className="mt-1 text-sm text-cyan-600">
            {chat.preview}
          </div>
        </div>
      ))}
      {savedChats.length === 0 && (
        <div className="text-center text-gray-500">
          No saved chats yet
        </div>
      )}
    </div>
  )

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'visualization':
        return <div className="text-gray-600">Data Visualization Content</div>
      case 'summary':
        return <div className="text-gray-600">Insights Summary Content</div>
      case 'trends':
        return <div className="text-gray-600">Future Trends Content</div>
      case 'chat':
        return renderChatContent()
      case 'history':
        return renderHistoryContent()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search - Find - Insight</h1>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Form Container */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
            {/* Topic Input */}
            <div className="mb-8">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Topic
              </label>
              <div className="relative">
                <textarea
                  id="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  rows={2}
                  className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
                  placeholder="Enter your topic here..."
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  {topicWordsRemaining} words remaining
                </div>
              </div>
            </div>

            {/* Context Input */}
            <div className="mb-8">
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Context
              </label>
              <div className="relative">
                <textarea
                  id="context"
                  value={context}
                  onChange={handleContextChange}
                  rows={8}
                  className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
                  placeholder="Enter your context here..."
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  {contextWordsRemaining} words remaining
                </div>
              </div>
            </div>

            {/* Type Dropdown */}
            <div className="mb-8">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Select Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none text-base"
              >
                <option value="">--select--</option>
                <option value="document">Document Available</option>
                <option value="url">URL Known</option>
                <option value="any">Any</option>
              </select>
            </div>

            {/* Conditional Content Based on Type */}
            {renderTypeContent()}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-base font-medium"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {['visualization', 'summary', 'trends', 'chat', 'history'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? 'border-cyan-500 text-cyan-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {renderTabContent()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default InsightsPage