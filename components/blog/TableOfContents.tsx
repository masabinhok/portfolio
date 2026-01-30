'use client'

import React, { useEffect, useState } from 'react'
import { TableOfContentsItem } from '@/types/blog'
import { List } from 'lucide-react'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (items.length === 0) return null

  return (
    <nav className="glass rounded-xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List size={18} className="text-blue-400" />
        <h3 className="font-semibold text-heading">Table of Contents</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`text-sm text-left w-full py-1 transition-colors hover:text-blue-400 ${
                activeId === item.id
                  ? 'text-blue-400 font-medium'
                  : 'text-muted'
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
