'use client'

import React, { useState, useMemo } from 'react'
import { BlogPostMeta } from '@/types/blog'
import BlogCard from './BlogCard'
import TagFilter from './TagFilter'
import BlogSearch from './BlogSearch'
import { PenTool, Sparkles } from 'lucide-react'

interface BlogListProps {
  posts: BlogPostMeta[]
  tags: string[]
}

const BlogList: React.FC<BlogListProps> = ({ posts, tags }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      )
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [posts, selectedTag, searchQuery])

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted">
          <PenTool size={16} className="text-blue-400" />
          <span>Technical Blog</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Thoughts & Tutorials
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Deep dives into backend development, DevOps practices, and software architecture. 
          Practical guides from real-world experience.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          <span className="text-sm text-muted">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !selectedTag && !searchQuery && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-yellow-400" />
            <h2 className="text-xl font-semibold text-heading">Featured</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section>
        {(selectedTag || searchQuery) && featuredPosts.length > 0 ? null : (
          <h2 className="text-xl font-semibold text-heading mb-6">
            {selectedTag ? `Posts tagged "${selectedTag}"` : 'All Articles'}
          </h2>
        )}
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedTag || searchQuery ? filteredPosts : regularPosts).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-xl">
            <p className="text-muted text-lg">
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedTag(null)
                setSearchQuery('')
              }}
              className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogList
