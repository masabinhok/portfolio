export type CodeTab = 'candidate.controller.ts' | 'data.ts'

// Types
export type ProjectCategory = 'Game' | 'Productivity' | 'Finance' | 'Design' | 'Mobile' | 'Analytics' | 'Love'
export type ProjectStatus = 'Live' | 'Beta' | 'Development'

export interface Project {
  id: number
  name: string
  url: string
  github: string
  description: string
  tech: string[]
  category: ProjectCategory
  color: string
  icon: string
  status: ProjectStatus
}

