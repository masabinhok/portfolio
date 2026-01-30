import React from 'react'
import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogList from '@/components/blog/BlogList'

export const metadata: Metadata = {
  title: 'Blog | Sabin Shrestha',
  description: 'Technical articles about backend development, DevOps, AWS, Docker, and software architecture. Practical guides from real-world experience.',
  openGraph: {
    title: 'Blog | Sabin Shrestha',
    description: 'Technical articles about backend development, DevOps, AWS, Docker, and software architecture.',
    type: 'website',
  },
}

const BlogsPage = () => {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <main className="w-full min-h-screen pt-24 pb-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        <BlogList posts={posts} tags={tags} />
      </div>
    </main>
  )
}

export default BlogsPage