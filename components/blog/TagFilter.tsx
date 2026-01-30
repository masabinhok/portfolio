'use client'

import React from 'react'

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onTagSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedTag === null
            ? 'bg-blue-500 text-white'
            : 'glass text-muted hover:text-white hover:bg-white/10'
        }`}
      >
        All Posts
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedTag === tag
              ? 'bg-blue-500 text-white'
              : 'glass text-muted hover:text-white hover:bg-white/10'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagFilter
