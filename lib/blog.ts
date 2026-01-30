import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogPostMeta, TableOfContentsItem } from '@/types/blog'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog')

/**
 * Get all blog post slugs from the content directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }
  return fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.mdx'))
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(POSTS_DIRECTORY, `${realSlug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug: realSlug,
      title: data.title,
      summary: data.summary,
      content,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      tags: data.tags || [],
      coverImage: data.coverImage,
      readingTime: stats.text,
      featured: data.featured || false,
    }
  } catch {
    return null
  }
}

/**
 * Get all blog posts sorted by date
 */
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      
      // Return only metadata, not full content
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content: _content, ...meta } = post
      return meta as BlogPostMeta
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return posts
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPosts()
  return posts.filter((post) => 
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPostMeta[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.featured)
}

/**
 * Extract table of contents from markdown content
 */
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const toc: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    toc.push({ id, text, level })
  }

  return toc
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMeta[] {
  const posts = getAllPosts()
  
  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => 
        tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      return { post, score: commonTags.length }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPostMeta[] {
  if (!query.trim()) return getAllPosts()
  
  const lowerQuery = query.toLowerCase()
  const posts = getAllPosts()

  return posts.filter((post) => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.summary.toLowerCase().includes(lowerQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
