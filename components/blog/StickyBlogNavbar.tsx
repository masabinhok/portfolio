'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Share2, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Author } from '@/types/blog'

interface StickyBlogNavbarProps {
  title: string
  author: Author
  postUrl: string
}

/**
 * Sticky Blog Navbar
 * 
 * A glassmorphism-styled navbar that appears when the user scrolls
 * past the main article header. Features:
 * - Smooth slide-in animation
 * - Go Back button (left)
 * - Truncated post title (center) - clickable to scroll to top
 * - Author avatar and name (right)
 * - Share dropdown button
 * - Reading progress indicator integrated
 * - Responsive design
 */
const StickyBlogNavbar: React.FC<StickyBlogNavbarProps> = ({ 
  title, 
  author, 
  postUrl 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  // Detect when to show the navbar (after scrolling past the title)
  const handleScroll = useCallback(() => {
    // Find the article header element
    const headerElement = document.querySelector('article header')
    
    if (headerElement) {
      const headerRect = headerElement.getBoundingClientRect()
      // Show navbar when header is scrolled out of view (with some buffer)
      const shouldShow = headerRect.bottom < -50
      setIsVisible(shouldShow)
    }

    // Calculate reading progress
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    setProgress(Math.min(100, Math.max(0, scrollProgress)))
  }, [])

  useEffect(() => {
    let ticking = false
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.share-menu-container')) {
        setShowShareMenu(false)
      }
    }

    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showShareMenu])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    router.push('/blogs')
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Truncate title for display
  const truncateTitle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '…'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.2 }
          }}
          className="fixed top-0 left-0 right-0 z-10 pointer-events-none"
        >
          {/* Main navbar container */}
          <div className="pointer-events-auto">
            {/* Glassmorphism background */}
            <div className="bg-[var(--background)]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-14 sm:h-16 flex items-center justify-between gap-4">
                  {/* Left: Go Back Button */}
                  <motion.button
                    onClick={goBack}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted hover:text-heading hover:bg-white/5 transition-all group shrink-0"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline text-sm font-medium">Go Back</span>
                  </motion.button>

                  {/* Center: Post Title */}
                  <motion.button
                    onClick={scrollToTop}
                    className="flex-1 min-w-0 text-center group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h2 className="text-sm sm:text-base font-semibold text-heading truncate group-hover:text-blue-400 transition-colors px-2">
                      {/* Mobile: shorter truncation */}
                      <span className="sm:hidden">{truncateTitle(title, 30)}</span>
                      {/* Tablet: medium truncation */}
                      <span className="hidden sm:inline md:hidden">{truncateTitle(title, 45)}</span>
                      {/* Desktop: longer truncation */}
                      <span className="hidden md:inline">{truncateTitle(title, 60)}</span>
                    </h2>
                    <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to scroll to top
                    </span>
                  </motion.button>

                  {/* Right: Author & Share */}
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    {/* Author info - hidden on mobile, minimal on tablet */}
                    <div className="hidden sm:flex items-center gap-2">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                        {author.name.charAt(0)}
                      </div>
                      {/* Name - hidden on small tablets */}
                      <span className="hidden md:inline text-sm text-muted font-medium">
                        {author.name}
                      </span>
                    </div>

                    {/* Separator - visible on larger screens */}
                    <div className="hidden md:block w-px h-6 bg-white/10" />

                    {/* Share Button with Dropdown */}
                    <div className="relative share-menu-container">
                      <motion.button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted hover:text-heading hover:bg-white/5 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Share article"
                      >
                        <Share2 size={16} />
                        <span className="hidden lg:inline text-sm">Share</span>
                      </motion.button>

                      {/* Share Dropdown Menu */}
                      <AnimatePresence>
                        {showShareMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-[var(--background)]/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20"
                          >
                            <a
                              href={shareLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                            >
                              <Twitter size={16} />
                              <span>Share on Twitter</span>
                            </a>
                            <a
                              href={shareLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-blue-600 hover:bg-blue-600/10 transition-all"
                            >
                              <Linkedin size={16} />
                              <span>Share on LinkedIn</span>
                            </a>
                            <button
                              onClick={copyToClipboard}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-green-400 hover:bg-green-400/10 transition-all"
                            >
                              {copied ? <Check size={16} /> : <Link2 size={16} />}
                              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reading Progress Indicator - integrated at the bottom of navbar */}
              <div className="h-0.5 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default StickyBlogNavbar
