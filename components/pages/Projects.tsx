
'use client'
import { ExternalLink, Github, Zap, Code, Palette, Database, Globe, Smartphone, Contact } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import ExceptionalButton from '../Button'

// Types
type ProjectCategory = 'Game' | 'Productivity' | 'Finance' | 'Design' | 'Mobile' | 'Analytics'
type ProjectStatus = 'Live' | 'Beta' | 'Development'

interface Project {
  id: number
  name: string
  url: string
  github: string
  description: string
  tech: string[]
  category: ProjectCategory
  color: string
  icon: string
  status: ProjectStatus
}

// Enhanced projects data with more details
const projects: Project[] = [
  {
    id: 1,
    name: 'e4.learnChess',
    url: 'https://e4-learnchess.vercel.app',
    github: 'https://github.com/masabinhok/e4',
    description: 'A chess opening trainer where you can practice lines by pasting PGNs, record your own custom sequences, or study curated openings. Features multiple practice modes and an admin panel for content management.',
    tech: ['Next.js', 'Nest.js', 'Chess.js', 'MongoDB'],
    category: 'Game',
    color: 'from-amber-400 to-orange-600',
    icon: '♟️',
    status: 'Live'
  },
]

const getCategoryIcon = (category: ProjectCategory) => {
  const icons: Record<ProjectCategory, typeof Code> = {
    Game: Code,
    Productivity: Zap,
    Finance: Database,
    Design: Palette,
    Mobile: Smartphone,
    Analytics: Globe
  }
  return icons[category] || Code
}

const getStatusColor = (status: ProjectStatus) => {
  const colors: Record<ProjectStatus, string> = {
    Live: 'bg-green-100 text-green-800',
    Beta: 'bg-yellow-100 text-yellow-800',
    Development: 'bg-blue-100 text-blue-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate deterministic particle positions based on project ID
  const getParticlePositions = (projectId: number) => {
    const positions = []
    for (let i = 0; i < 6; i++) {
      // Use project ID and index to create deterministic but varied positions
      const x = ((projectId * 17 + i * 23) % 100)
      const y = ((projectId * 13 + i * 31) % 100)
      positions.push({ x, y, delay: i * 0.5 })
    }
    return positions
  }

  return (
    <section className='min-h-screen py-20 px-4'>
      {/* Header */}
      <div className='max-w-7xl mx-auto mb-16 text-center'>
        <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2'>
          Featured Projects
        </h1>
        <p className='text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed'>
          Discover my latest creations - ideas turned into art.
        </p>
        <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8 rounded-full'></div>
      </div>

      {/* Projects Grid */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => {
          const CategoryIcon = getCategoryIcon(project.category)

          return (
            <div
              key={project.id}
              className='group relative'
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Main Card */}
              <div className='relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/20'>

                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Project Image/Icon Area */}
                <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
                  {/* Floating Icon */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-6xl animate-bounce' style={{ animationDuration: '3s' }}>
                      {project.icon}
                    </div>
                  </div>

                  {/* Animated Particles */}
                  {isClient && (
                    <div className='absolute inset-0'>
                      {getParticlePositions(project.id).map((particle, i) => (
                        <div
                          key={i}
                          className='absolute w-2 h-2 bg-white/30 rounded-full animate-pulse'
                          style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: '2s'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className='absolute top-4 left-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Category Icon */}
                  <div className='absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2'>
                    <CategoryIcon className='w-5 h-5 text-white' />
                  </div>
                </div>

                {/* Content */}
                <div className='p-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300'>
                      {project.name}
                    </h3>
                    <span className='text-sm text-gray-400 bg-gray-800/50 px-2 py-1 rounded'>
                      {project.category}
                    </span>
                  </div>

                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className='flex flex-wrap gap-2'>
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className='px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-3 pt-4 relative z-10'>
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex-1 justify-center'
                    >
                      <ExternalLink className='w-4 h-4' />
                      <span>Live Demo</span>
                    </a>

                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-gray-600'
                    >
                      <Github className='w-4 h-4' />
                    </a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${hoveredProject === project.id
                  ? 'ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20'
                  : ''
                  }`}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className='max-w-4xl mx-auto mt-20 text-center'>
        <div className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8'>
          <h2 className='text-3xl font-bold text-white mb-4'>Interested in collaborating?</h2>
          <p className='text-gray-300 mb-6'>Let's build something amazing together</p>
          <ExceptionalButton size='md'>
            <Contact className='w-5 h-5' />
            <span>Get In Touch</span>
          </ExceptionalButton>
        </div>
      </div>
    </section>
  )
}

export default Projects