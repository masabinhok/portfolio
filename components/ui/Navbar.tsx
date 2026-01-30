'use client'
import { Navlinks } from '@/constants/constants'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, PenTool, Code } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Icon mapping for each nav item
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home':
        return <Home size={16} />
      case 'projects':
        return <FolderOpen size={16} />
      case 'blogs':
        return <PenTool size={16} />
      case 'dsa':
        return <Code size={16} />
      default:
        return <Home size={16} />
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <section className="fixed opacity-0 top-6 left-6 z-100 transition-all duration-300 hidden lg:block">
        <nav className="flex flex-col gap-2 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 bg-gray-900/20 border border-gray-700/20">
          {Navlinks.map((nav, idx) => (
            <Link key={idx} href={nav.link}>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-700/30">
                <span className="relative z-10">
                  {getIcon(nav.name)}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </section>
    )
  }

  return (
    <motion.section
      className="fixed top-6 left-6 z-50 transition-all duration-300 hidden lg:block"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.nav
        className={`flex flex-col gap-2 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${scrolled
          ? 'bg-gray-900/60 border border-gray-700/30'
          : 'bg-gray-900/20 border border-gray-700/20'
          }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {Navlinks.map((nav, idx) => {
          const isActive = pathname === nav.link || (nav.link !== '/' && pathname.startsWith(nav.link))

          return (
            <Link key={idx} href={nav.link}>
              <motion.div
                className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer group ${isActive
                  ? 'text-white bg-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={nav.name}
              >
                {/* Active glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/30 rounded-lg blur-sm"
                    layoutId="activeGlow"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon */}
                <span className="relative z-10">
                  {getIcon(nav.name)}
                </span>

                {/* Subtle hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </Link>
          )
        })}
      </motion.nav>
    </motion.section>
  )
}

export default Navbar