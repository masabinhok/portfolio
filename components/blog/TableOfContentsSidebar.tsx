'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { TableOfContentsItem } from '@/types/blog'
import { List, ChevronRight, X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TableOfContentsSidebarProps {
  items: TableOfContentsItem[]
  className?: string
}

/**
 * NestJS Docs-style Table of Contents Sidebar
 * 
 * Features:
 * - Sticky positioning independent of main content scroll
 * - Scroll-aware active section tracking via Intersection Observer
 * - Auto-scrolls ToC to keep active item visible
 * - Smooth scroll to section on click with header offset
 * - Nested heading support (h2/h3/h4)
 * - Mobile drawer toggle
 */
const TableOfContentsSidebar: React.FC<TableOfContentsSidebarProps> = ({ 
  items,
  className = ''
}) => {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const tocRef = useRef<HTMLElement>(null)
  const activeItemRef = useRef<HTMLButtonElement>(null)
  const isManualScrollRef = useRef(false)

  // Header offset for scroll positioning (adjust based on your fixed header height)
  const HEADER_OFFSET = 100

  /**
   * Intersection Observer for tracking active section
   * 
   * How it works:
   * - Observes all heading elements in the document
   * - Uses rootMargin to create a "trigger zone" near the top of viewport
   * - When a heading enters this zone, it becomes active
   * - The -20% top margin and -79% bottom margin creates a thin detection band
   *   near the top of the viewport for precise tracking
   */
  useEffect(() => {
    if (items.length === 0) return

    // Track all visible headings to handle edge cases
    const visibleHeadings = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if user is manually scrolling to a section
        if (isManualScrollRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry)
          } else {
            visibleHeadings.delete(entry.target.id)
          }
        })

        // Find the topmost visible heading
        if (visibleHeadings.size > 0) {
          let topmostHeading: IntersectionObserverEntry | null = null
          let topmostY = Infinity

          visibleHeadings.forEach((entry) => {
            const rect = entry.target.getBoundingClientRect()
            if (rect.top < topmostY && rect.top >= -HEADER_OFFSET) {
              topmostY = rect.top
              topmostHeading = entry
            }
          })

          if (topmostHeading) {
            setActiveId((topmostHeading as IntersectionObserverEntry).target.id)
          }
        }
      },
      {
        // rootMargin creates the detection zone:
        // - Top: -80px accounts for fixed header
        // - Bottom: -70% means only the top 30% of viewport triggers
        rootMargin: '-80px 0px -70% 0px',
        threshold: [0, 0.5, 1]
      }
    )

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    // Set initial active heading on mount
    const setInitialActive = () => {
      const hash = window.location.hash.slice(1)
      if (hash && items.some(item => item.id === hash)) {
        setActiveId(hash)
      } else if (items.length > 0) {
        // Find the first heading that's in or above the viewport
        for (const item of items) {
          const element = document.getElementById(item.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top >= -HEADER_OFFSET) {
              setActiveId(item.id)
              break
            }
          }
        }
      }
    }

    setInitialActive()

    return () => observer.disconnect()
  }, [items, HEADER_OFFSET])

  /**
   * Auto-scroll ToC to keep active item visible
   * Uses scrollIntoView with 'nearest' to minimize movement
   */
  useEffect(() => {
    if (activeItemRef.current && tocRef.current) {
      const tocRect = tocRef.current.getBoundingClientRect()
      const itemRect = activeItemRef.current.getBoundingClientRect()

      // Check if item is outside visible area of ToC
      const isAbove = itemRect.top < tocRect.top
      const isBelow = itemRect.bottom > tocRect.bottom

      if (isAbove || isBelow) {
        activeItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
    }
  }, [activeId])

  /**
   * Smooth scroll to heading with offset for fixed header
   * Uses manual scroll flag to prevent Intersection Observer interference
   */
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    // Set flag to prevent observer from changing active state during scroll
    isManualScrollRef.current = true
    setActiveId(id)

    // Calculate position with header offset
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // Update URL hash without jumping
    window.history.pushState(null, '', `#${id}`)

    // Reset manual scroll flag after animation completes
    setTimeout(() => {
      isManualScrollRef.current = false
    }, 1000)

    // Close mobile drawer if open
    setMobileOpen(false)
  }, [HEADER_OFFSET])

  // Handle hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && items.some(item => item.id === hash)) {
        scrollToHeading(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [items, scrollToHeading])

  if (items.length === 0) return null

  /**
   * Renders a single ToC item with proper indentation and active state
   */
  const renderTocItem = (item: TableOfContentsItem) => {
    const isActive = activeId === item.id
    const indentLevel = item.level - 2 // h2 = 0, h3 = 1, h4 = 2

    return (
      <li key={item.id} className="relative">
        <button
          ref={isActive ? activeItemRef : null}
          onClick={() => scrollToHeading(item.id)}
          className={`
            group flex items-start gap-2 w-full text-left py-1.5 pr-2 text-sm
            transition-all duration-200 rounded-md
            ${isActive 
              ? 'text-blue-400 font-medium' 
              : 'text-muted hover:text-heading'
            }
          `}
          style={{ paddingLeft: `${indentLevel * 16 + 8}px` }}
        >
          {/* Active indicator line */}
          <span 
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full
              transition-all duration-200
              ${isActive ? 'bg-blue-400' : 'bg-transparent group-hover:bg-white/20'}
            `}
          />
          
          {/* Chevron for h2 items */}
          {item.level === 2 && (
            <ChevronRight 
              size={14} 
              className={`
                mt-0.5 shrink-0 transition-transform duration-200
                ${isActive ? 'text-blue-400 rotate-90' : 'text-muted/50'}
              `}
            />
          )}
          
          <span className="leading-snug">{item.text}</span>
        </button>
      </li>
    )
  }

  /**
   * Groups items by h2 parent for nested rendering
   * Creates visual hierarchy like NestJS docs
   */
  const renderNestedItems = () => {
    const grouped: { parent: TableOfContentsItem; children: TableOfContentsItem[] }[] = []
    let currentGroup: { parent: TableOfContentsItem; children: TableOfContentsItem[] } | null = null

    items.forEach((item) => {
      if (item.level === 2) {
        if (currentGroup) {
          grouped.push(currentGroup)
        }
        currentGroup = { parent: item, children: [] }
      } else if (currentGroup) {
        currentGroup.children.push(item)
      }
    })

    if (currentGroup) {
      grouped.push(currentGroup)
    }

    // If no h2s found, render flat list
    if (grouped.length === 0) {
      return items.map(renderTocItem)
    }

    return grouped.map(({ parent, children }) => (
      <React.Fragment key={parent.id}>
        {renderTocItem(parent)}
        {children.length > 0 && (
          <ul className="space-y-0.5">
            {children.map(renderTocItem)}
          </ul>
        )}
      </React.Fragment>
    ))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden xl:block w-[280px] shrink-0 ${className}`}
      >
        <nav 
          ref={tocRef}
          className="fixed top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <div className="pr-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <List size={18} className="text-blue-400" />
              <h3 className="font-semibold text-heading text-sm uppercase tracking-wider">
                On This Page
              </h3>
            </div>

            {/* ToC Items */}
            <ul className="space-y-0.5">
              {renderNestedItems()}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-blue-600 transition-colors"
        aria-label="Open table of contents"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="xl:hidden fixed right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <List size={18} className="text-blue-400" />
                  <h3 className="font-semibold text-heading">On This Page</h3>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Close table of contents"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-0.5">
                  {renderNestedItems()}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default TableOfContentsSidebar
