import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPostSlugs, extractTableOfContents, getRelatedPosts } from '@/lib/blog'
import { format } from 'date-fns'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import MDXContent from '@/components/blog/MDXContent'
import TableOfContentsSidebar from '@/components/blog/TableOfContentsSidebar'
import AuthorBio from '@/components/blog/AuthorBio'
import ShareButtons from '@/components/blog/ShareButtons'
import RelatedPosts from '@/components/blog/RelatedPosts'
import StickyBlogNavbar from '@/components/blog/StickyBlogNavbar'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Sabin Shrestha`,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const tableOfContents = extractTableOfContents(post.content)
  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sabinshrestha.dev'
  const postUrl = `${baseUrl}/blogs/${post.slug}`

  return (
    <>
      {/* Sticky Blog Navbar - appears when scrolling past the header */}
      <StickyBlogNavbar 
        title={post.title} 
        author={post.author} 
        postUrl={postUrl} 
      />

      <main className="w-full min-h-screen pt-24 pb-16">
        {/* 
          NestJS Docs-style Layout:
          - Centered content container with max-width for readability
          - Independent sticky ToC sidebar on the right
          - Proper spacing and visual hierarchy
        */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content area with sidebar */}
          <div className="flex gap-8 xl:gap-12">
            {/* Left spacer for balance on very large screens */}
            <div className="hidden 2xl:block w-16 shrink-0" />

            {/* Article Content */}
            <article className="flex-1 min-w-0 max-w-[850px]">
              {/* Back Link */}
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-muted hover:text-blue-400 transition-colors mb-8 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to all articles</span>
              </Link>

              {/* Article Header */}
              <header className="mb-12">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all"
                    >
                      <Tag size={12} />
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-muted mb-6">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-heading font-medium text-sm">{post.author.name}</p>
                      <p className="text-xs">{post.author.role}</p>
                    </div>
                  </div>

                  {/* Separator */}
                  <span className="hidden sm:block w-px h-8 bg-white/10" />

                  {/* Date */}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-purple-400" />
                    <time dateTime={post.publishedAt} className="text-sm">
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </time>
                  </div>

                  {/* Reading Time */}
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-green-400" />
                    <span className="text-sm">{post.readingTime}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <ShareButtons title={post.title} url={postUrl} />
              </header>

              {/* Article Body */}
              <div className="prose-container">
                <MDXContent source={post.content} />
              </div>

              {/* Author Bio - After content */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <AuthorBio author={post.author} />
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />

              {/* Bottom Navigation */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-muted hover:text-blue-400 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span>All articles</span>
                </Link>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </article>

            {/* Table of Contents Sidebar */}
            <TableOfContentsSidebar items={tableOfContents} />
          </div>
        </div>
      </main>
    </>
  )
}
