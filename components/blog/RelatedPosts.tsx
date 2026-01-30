import React from 'react'
import Link from 'next/link'
import { BlogPostMeta } from '@/types/blog'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold text-heading mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group glass rounded-xl p-5 transition-all hover:bg-white/5"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-semibold text-heading group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-muted line-clamp-2">{post.summary}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Read more</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts
