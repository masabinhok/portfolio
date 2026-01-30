'use client'

import React from 'react'
import { Search, X } from 'lucide-react'

interface BlogSearchProps {
  value: string
  onChange: (value: string) => void
}

const BlogSearch: React.FC<BlogSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-md w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 rounded-xl glass text-default placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

export default BlogSearch
