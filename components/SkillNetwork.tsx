'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkillNode {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'language' | 'framework'
  x: number
  y: number
  connections: string[]
  color: string
  icon: string
  description: string
}

interface Connection {
  from: string
  to: string
  strength: number
}

const SkillNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Define skill nodes with their positions and connections
  const skillNodes: SkillNode[] = [
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'language',
      x: 50,
      y: 30,
      connections: ['react', 'nestjs', 'nextjs', 'nodejs'],
      color: 'from-blue-400 to-blue-600',
      icon: '🔷',
      description: 'Strongly typed JavaScript superset'
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'frontend',
      x: 20,
      y: 60,
      connections: ['typescript', 'nextjs'],
      color: 'from-cyan-400 to-cyan-600',
      icon: '⚛️',
      description: 'Component-based UI library'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'framework',
      x: 35,
      y: 85,
      connections: ['react', 'typescript'],
      color: 'from-gray-700 to-gray-900',
      icon: '🔺',
      description: 'Full-stack React framework'
    },
    {
      id: 'nestjs',
      name: 'Nest.js',
      category: 'backend',
      x: 80,
      y: 60,
      connections: ['typescript', 'nodejs', 'postgresql', 'mongodb'],
      color: 'from-red-400 to-red-600',
      icon: '🐱',
      description: 'Enterprise-grade Node.js framework'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      x: 65,
      y: 85,
      connections: ['typescript', 'nestjs', 'postgresql', 'mongodb'],
      color: 'from-green-400 to-green-600',
      icon: '🟢',
      description: 'JavaScript runtime environment'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'database',
      x: 85,
      y: 20,
      connections: ['nestjs', 'nodejs'],
      color: 'from-blue-600 to-indigo-700',
      icon: '🐘',
      description: 'Advanced relational database'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'database',
      x: 15,
      y: 20,
      connections: ['nestjs', 'nodejs'],
      color: 'from-emerald-500 to-green-700',
      icon: '🍃',
      description: 'NoSQL document database'
    }
  ]

  // Generate connections based on node relationships
  const connections: Connection[] = []
  skillNodes.forEach(node => {
    node.connections.forEach(connectedId => {
      if (!connections.find(c =>
        (c.from === node.id && c.to === connectedId) ||
        (c.from === connectedId && c.to === node.id)
      )) {
        connections.push({
          from: node.id,
          to: connectedId,
          strength: Math.random() * 0.5 + 0.5
        })
      }
    })
  })

  // Initialize container dimensions
  useEffect(() => {
    const initializeContainer = () => {
      if (containerRef.current) {
        setIsInitialized(true)
      }
    }

    // Check immediately
    initializeContainer()

    // Also check after a short delay to ensure container is fully rendered
    const timer = setTimeout(initializeContainer, 100)

    return () => clearTimeout(timer)
  }, [])

  // Animation phases
  useEffect(() => {
    if (!isInitialized) return

    const phases = [0, 1, 2, 3]
    let currentPhaseIndex = 0

    const interval = setInterval(() => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
    }, 3000)

    return () => clearInterval(interval)
  }, [isInitialized])

  const getNodePosition = (node: SkillNode) => {
    const container = containerRef.current
    if (!container || !isInitialized) {
      // Use consistent fallback positions based on the expected container size
      const fallbackWidth = isMobile ? 300 : 400
      const fallbackHeight = isMobile ? 250 : 300
      return {
        x: (node.x / 100) * (fallbackWidth - 80) + 40,
        y: (node.y / 100) * (fallbackHeight - 80) + 40
      }
    }

    const rect = container.getBoundingClientRect()
    const width = rect.width > 0 ? rect.width : (isMobile ? 300 : 400)
    const height = rect.height > 0 ? rect.height : (isMobile ? 250 : 300)

    // Adjust margins based on screen size
    const margin = isMobile ? 40 : 50

    return {
      x: (node.x / 100) * (width - margin * 2) + margin,
      y: (node.y / 100) * (height - margin * 2) + margin
    }
  }

  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const fromPos = getNodePosition(from)
    const toPos = getNodePosition(to)

    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2

    // Reduce offset on smaller screens
    const offset = isMobile ? 10 : 20

    return `M ${fromPos.x} ${fromPos.y} Q ${midX + offset} ${midY - offset} ${toPos.x} ${toPos.y}`
  }

  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNode && !selectedNode) return true
    if (hoveredNode === nodeId || selectedNode === nodeId) return true

    const activeNode = hoveredNode || selectedNode
    if (activeNode) {
      const node = skillNodes.find(n => n.id === activeNode)
      return node?.connections.includes(nodeId) || false
    }

    return false
  }

  const isConnectionHighlighted = (connection: Connection) => {
    if (!hoveredNode && !selectedNode) return true

    const activeNode = hoveredNode || selectedNode
    if (activeNode) {
      return connection.from === activeNode || connection.to === activeNode
    }

    return false
  }

  return (
    <section className='w-full h-[400px] sm:h-[500px] lg:h-[600px] relative'>
      {/* Network Visualization */}
      <div ref={containerRef} className='relative w-full h-full p-2 sm:p-4'>
        {/* SVG for connections */}
        <svg className='absolute inset-0 w-full h-full pointer-events-none'>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {isInitialized && connections.map((connection, index) => {
            const fromNode = skillNodes.find(n => n.id === connection.from)
            const toNode = skillNodes.find(n => n.id === connection.to)

            if (!fromNode || !toNode) return null

            const isHighlighted = isConnectionHighlighted(connection)

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={getConnectionPath(fromNode, toNode)}
                stroke={isHighlighted ? '#10b981' : '#374151'}
                strokeWidth={isHighlighted ? 2 : 1}
                fill="none"
                className="transition-all duration-300"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHighlighted ? 0.8 : 0.3,
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
                filter={isHighlighted ? "url(#glow)" : undefined}
                style={{ strokeDasharray: "none" }}
              />
            )
          })}
        </svg>

        {/* Skill Nodes */}
        {isInitialized && skillNodes.map((node, index) => {
          const position = getNodePosition(node)
          const isHighlighted = isNodeHighlighted(node.id)

          return (
            <motion.div
              key={node.id}
              className={`absolute cursor-pointer transition-all duration-300 ${isHighlighted ? 'z-20' : 'z-10'
                }`}
              style={{
                left: position.x - (isMobile ? 20 : 25),
                top: position.y - (isMobile ? 20 : 25),
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHighlighted ? (isMobile ? 1.1 : 1.2) : 1,
                opacity: isHighlighted ? 1 : 0.6
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => !isMobile && setHoveredNode(node.id)}
              onMouseLeave={() => !isMobile && setHoveredNode(null)}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              whileHover={{ scale: isMobile ? 1.2 : 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${node.color} 
                flex items-center justify-center text-white font-bold text-sm sm:text-lg
                shadow-lg border-2 border-gray-700
                ${isHighlighted ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
              `}>
                <span className="text-base sm:text-xl">{node.icon}</span>
              </div>

              {/* Node label */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap">
                {node.name}
              </div>
            </motion.div>
          )
        })}


      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {(hoveredNode || selectedNode) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-0 left-2 right-2 sm:left-4 sm:right-4 bg-gray-800 border border-gray-600 rounded-lg p-2 sm:p-3 z-30"
          >
            {(() => {
              const activeNode = skillNodes.find(n => n.id === (hoveredNode || selectedNode))
              if (!activeNode) return null

              return (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg sm:text-xl">{activeNode.icon}</span>
                    <h3 className="text-green-400 font-semibold text-sm sm:text-base">{activeNode.name}</h3>
                    <span className="text-xs bg-gray-700 px-1 sm:px-2 py-1 rounded text-gray-300">
                      {activeNode.category}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm">{activeNode.description}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    <span className="hidden sm:inline">Connected to: </span>
                    <span className="sm:hidden">Links: </span>
                    {activeNode.connections.map(id =>
                      skillNodes.find(n => n.id === id)?.name
                    ).join(', ')}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SkillNetwork
