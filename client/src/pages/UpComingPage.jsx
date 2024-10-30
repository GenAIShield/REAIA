'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Fingerprint,
  GitPullRequest,
  Layers,
  Rocket,
  Sparkles,
  Timer,
  Zap
} from 'lucide-react'
import Navbar from '../components/LandingPageComponents/Navbar'

export default function UpComingPage() {
  const [selectedVersion, setSelectedVersion] = useState('2.0')

  const versions = [
    {
      version: '2.0',
      name: 'Major Release',
      date: 'March 2024',
      status: 'In Development',
      progress: 65,
      features: [
        {
          icon: <Fingerprint className="w-5 h-5" />,
          title: 'Advanced Authentication',
          description: 'Implement biometric authentication and SSO integration',
          status: 'In Progress'
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'AI-Powered Analytics',
          description: 'Real-time data analysis with machine learning insights',
          status: 'In Progress'
        },
        {
          icon: <Zap className="w-5 h-5" />,
          title: 'Performance Optimization',
          description: 'Up to 50% faster load times and reduced memory usage',
          status: 'Testing'
        }
      ]
    },
    {
      version: '1.8',
      name: 'Feature Update',
      date: 'February 2024',
      status: 'Planning',
      progress: 25,
      features: [
        {
          icon: <Code2 className="w-5 h-5" />,
          title: 'Custom Themes API',
          description: 'Enable users to create and share custom themes',
          status: 'Planning'
        },
        {
          icon: <Layers className="w-5 h-5" />,
          title: 'Enhanced UI Components',
          description: 'New components and improved existing ones',
          status: 'In Progress'
        }
      ]
    },
    {
      version: '1.7',
      name: 'Patch Update',
      date: 'January 2024',
      status: 'Final Testing',
      progress: 90,
      features: [
        {
          icon: <GitPullRequest className="w-5 h-5" />,
          title: 'Version Control Integration',
          description: 'Direct integration with popular VCS platforms',
          status: 'Testing'
        }
      ]
    }
  ]

  return (
    <div>
        <Navbar />
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Upcoming Features</h1>
          <p className="mt-2 text-gray-600">Explore what's coming next in our development pipeline</p>
        </div>
        <Rocket className="w-8 h-8 text-cyan-600" />
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {versions.map((v) => (
          <button
            key={v.version}
            onClick={() => setSelectedVersion(v.version)}
            className={`flex flex-col items-start px-4 py-3 rounded-lg border-2 transition-all min-w-[200px]
              ${selectedVersion === v.version 
                ? 'border-cyan-600 bg-cyan-50' 
                : 'border-gray-200 hover:border-cyan-300'}`}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {v.date}
            </div>
            <div className="font-semibold mt-1">Version {v.version}</div>
            <div className="text-sm text-gray-600 mt-1">{v.name}</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div
                className="bg-cyan-600 h-1.5 rounded-full"
                style={{ width: `${v.progress}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {versions.map((v) => (
        <div
          key={v.version}
          className={`space-y-6 ${selectedVersion === v.version ? 'block' : 'hidden'}`}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-600" />
              <span className="font-medium">Estimated Release:</span>
              <span className="text-gray-600">{v.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-cyan-600" />
              <span className="font-medium">Status:</span>
              <span className="text-gray-600">{v.status}</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {v.features.map((feature, index) => (
              <div
                key={index}
                className="relative group rounded-xl border border-gray-200 p-6 hover:border-cyan-300 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                    <span className="text-gray-600">{feature.status}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}