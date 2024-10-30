
import React, { useState } from 'react';
import { Upload, X, FileText, Bold, Italic, List, Image, Type } from 'lucide-react';

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange }) => {
    const editorRef = React.useRef(null);
  
    const handleFormat = (command) => {
      document.execCommand(command, false, null);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };
  
    const handleFontSize = (size) => {
      document.execCommand('fontSize', false, size);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };
  
    const handleInput = (e) => {
      onChange(e.currentTarget.innerHTML);
    };
  
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-gray-300 bg-gray-50">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          
          {/* Font Size Dropdown */}
          <select
            onChange={(e) => handleFontSize(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            title="Font Size"
          >
            <option value="3">Normal</option>
            <option value="1">Small</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>
  
        {/* Editable Content Area */}
        <div
          ref={editorRef}
          className="min-h-[300px] p-4 focus:outline-none"
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          suppressContentEditableWarning={true}
        />
      </div>
    );
  };
const PostResearchPage = () => {
  // State management
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [files, setFiles] = useState([]);
  const [richTextContent, setRichTextContent] = useState('');
  const [reports, setReports] = useState([]);

  // Previous reports data (disabled)
  const discussionData = [
    {
      user: "Dr. Sarah Johnson",
      date: "April 15, 2024",
      content: `The implications of quantum computing on modern cryptography systems remain both fascinating and concerning. Through our research, we've identified several key vulnerabilities in current encryption methods that could be exploited by sufficiently powerful quantum computers. However, it's crucial to note that these findings are theoretical and based on projected capabilities of quantum systems that don't yet exist.

Our analysis suggests that the development of quantum-resistant cryptography should be prioritized, particularly in sectors handling sensitive long-term data. The transition to quantum-safe algorithms needs to begin well before quantum computers become powerful enough to break current encryption methods. This proactive approach is essential given the "harvest now, decrypt later" threat model.

We've also examined several promising post-quantum cryptographic algorithms, evaluating their efficiency and security against both classical and quantum attacks. The results indicate that lattice-based cryptography offers a particularly promising direction, though implementation challenges remain. The significant increase in key sizes and computational overhead in post-quantum algorithms presents practical deployment challenges that need to be addressed.

Furthermore, our research highlights the importance of crypto-agility in modern systems. Organizations need to design their security architectures to be flexible enough to accommodate algorithm updates without significant system overhauls. This includes considering hybrid approaches that combine both classical and quantum-resistant algorithms during the transition period.`
    },
    {
      user: "Prof. Michael Chen",
      date: "April 16, 2024",
      content: `Your analysis of quantum computing's impact on cryptography raises several interesting points. I'd like to add some perspectives from our recent work in post-quantum cryptographic implementations.

We've been focusing on the practical aspects of deploying quantum-resistant algorithms in real-world systems, particularly in resource-constrained environments. Our findings suggest that while lattice-based approaches show promise, their memory requirements pose significant challenges for embedded systems and IoT devices.

One potential solution we've been exploring involves a hybrid approach that dynamically adjusts the security level based on the sensitivity of the data and the estimated timeframe for which it needs to remain secure. This allows for more efficient resource utilization while maintaining adequate security margins against future quantum threats.

We've also been investigating the role of quantum key distribution (QKD) as a complementary technology. While QKD isn't a complete solution to the quantum threat, our research suggests it could play a valuable role in specific high-security applications, particularly when combined with post-quantum cryptographic algorithms.

I'd be particularly interested in your thoughts on the trade-offs between different post-quantum approaches and how they might be optimized for different use cases. Have you considered the implications of your findings for specific industry sectors or application types?`
    }
  ];

  // Editable reports
  const editableReports = [
    {
      user: "Michael Jane",
      date: "April 17, 2024",
      content: "Initial analysis of the quantum cryptography implementation...",
      id: 1
    },
    {
      user: "Dr. Emily Wang",
      date: "April 17, 2024",
      content: "Review of security protocols in quantum-safe systems...",
      id: 2
    }
  ];

  // Event handlers
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 
      title, 
      summary, 
      visibility, 
      files,
      richTextContent 
    });
    // Handle form submission
  };

  const submitReport = () => {
    if (richTextContent.trim()) {
      const newReport = {
        id: Date.now(),
        user: "Current User",
        date: new Date().toLocaleDateString(),
        content: richTextContent
      };
      setReports(prev => [...prev, newReport]);
      setRichTextContent('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Post Research</h1>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <textarea
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 50))}
            placeholder="Enter research title"
            className="w-full min-h-[60px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={50}
          />
          <p className="text-sm text-gray-500 text-right">{title.length}/50 words</p>
        </div>

        {/* Summary Input */}
        <div className="space-y-2">
          <label htmlFor="summary" className="block text-lg font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value.slice(0, 1000))}
            placeholder="Enter research summary"
            className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={1000}
          />
          <p className="text-sm text-gray-500 text-right">{summary.length}/1000 words</p>
        </div>

        {/* Visibility Dropdown */}
        <div className="space-y-2">
          <label htmlFor="visibility" className="block text-lg font-medium text-gray-700">
            Visibility
          </label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <span className="block text-lg font-medium text-gray-700">
            Attachments
          </span>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors hover:border-blue-500">
            <input
              type="file"
              id="files"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="files"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <Upload className="h-10 w-10 text-blue-500" />
              <span className="text-lg text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500">
                Support for multiple files
              </span>
            </label>
          </div>
          
          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600 flex-1">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-2 rounded-lg"
        >
          Post Research
        </button>
      </form>

      {/* Previous Reports Section (Disabled) */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Previous Reports</h2>
        {discussionData.map((discussion, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{discussion.user}</span>
              <span className="text-gray-500">{discussion.date}</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <textarea
                className="w-full bg-gray-50 text-gray-700 resize-none"
                value={discussion.content}
                disabled
                rows={10}
              />
            </div>
          </div>
        ))}
      </div>

      {/* New Report Section */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Add New Report</h2>
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <RichTextEditor
            value={richTextContent}
            onChange={setRichTextContent}
          />
          <button
            onClick={submitReport}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg"
          >
            Add Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostResearchPage;