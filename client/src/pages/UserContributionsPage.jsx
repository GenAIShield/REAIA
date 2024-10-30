import React from 'react'
import Navbar from '../components/LandingPageComponents/Navbar'

const UserContributionsPage = () => {
  // Dummy data for 20 cards
  const communityPosts = [
    {
      id: 1,
      title: 'Getting Started with React Development',
      description: 'Learn the fundamentals of React development including components, state management, and hooks. Perfect for beginners looking to start their journey in modern web development.',
      publishedDate: '2024-03-15'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      description: 'Deep dive into advanced TypeScript patterns and best practices. Explore generic types, utility types, and advanced type inference techniques.',
      publishedDate: '2024-03-14'
    },
    {
      id: 3,
      title: 'Building Scalable Node.js Applications',
      description: 'Learn how to build and scale Node.js applications with proper architecture, testing, and deployment strategies.',
      publishedDate: '2024-03-13'
    },
    {
      id: 4,
      title: 'Modern CSS Techniques',
      description: 'Explore modern CSS techniques including Grid, Flexbox, Custom Properties, and CSS-in-JS solutions.',
      publishedDate: '2024-03-12'
    },
    {
      id: 5,
      title: 'Introduction to Docker Containers',
      description: 'Understanding Docker containers and how they can improve your development workflow and deployment process.',
      publishedDate: '2024-03-11'
    },
    {
      id: 6,
      title: 'GraphQL API Design',
      description: 'Learn how to design efficient GraphQL APIs with proper schema design and resolver implementation.',
      publishedDate: '2024-03-10'
    },
    {
      id: 7,
      title: 'Redux State Management',
      description: 'Master Redux state management for React applications with practical examples and best practices.',
      publishedDate: '2024-03-09'
    },
    {
      id: 8,
      title: 'AWS Cloud Architecture',
      description: 'Understanding AWS cloud services and how to architect scalable cloud solutions.',
      publishedDate: '2024-03-08'
    },
    {
      id: 9,
      title: 'Mobile Development with React Native',
      description: 'Build cross-platform mobile applications using React Native and modern mobile development practices.',
      publishedDate: '2024-03-07'
    },
    {
      id: 10,
      title: 'Web Security Best Practices',
      description: 'Essential security practices for modern web applications including authentication, authorization, and data protection.',
      publishedDate: '2024-03-06'
    },
    
  ]

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Valuable Contributions</h1>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Published: {formatDate(post.publishedDate)}</span>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="text-cyan-600 hover:text-cyan-700 font-medium">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default UserContributionsPage;