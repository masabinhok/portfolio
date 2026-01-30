export interface Author {
  name: string
  role: string
  avatar: string
  bio: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  summary: string
  content: string
  publishedAt: string
  updatedAt?: string
  author: Author
  tags: string[]
  coverImage?: string
  readingTime: string
  featured?: boolean
}

export interface BlogPostMeta {
  slug: string
  title: string
  summary: string
  publishedAt: string
  author: Author
  tags: string[]
  coverImage?: string
  readingTime: string
  featured?: boolean
}

export type BlogTag = 
  | 'Backend'
  | 'Frontend'
  | 'DevOps'
  | 'AWS'
  | 'Docker'
  | 'Kubernetes'
  | 'Database'
  | 'TypeScript'
  | 'Node.js'
  | 'React'
  | 'Next.js'
  | 'NestJS'
  | 'PostgreSQL'
  | 'MongoDB'
  | 'Redis'
  | 'CI/CD'
  | 'Security'
  | 'Performance'
  | 'Architecture'
  | 'Testing'

export interface TableOfContentsItem {
  id: string
  text: string
  level: number
}
