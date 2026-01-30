'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { BlogPostMeta } from '@/types/blog'
import { format } from 'date-fns'

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
    <article
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
        featured
          ? 'col-span-full lg:col-span-2 glass-strong'
          : 'glass'
      }`}
    >
      <Link href={`/blogs/${post.slug}`} className="block h-full">
        <div className={`p-6 ${featured ? 'md:p-8' : ''} h-full flex flex-col`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-heading mb-3 group-hover:text-blue-400 transition-colors ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h2>

          {/* Summary */}
          <p
            className={`text-muted mb-4 flex-grow ${
              featured ? 'text-base' : 'text-sm line-clamp-3'
            }`}
          >
            {post.summary}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-blue-400" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-purple-400" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-green-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Read More Arrow */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ArrowRight size={18} className="text-blue-400" />
            </div>
          </div>
        </div>
      </Link>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      </div>
    </article>
  )
}

export default BlogCard
