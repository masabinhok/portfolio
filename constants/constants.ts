import { Project } from "@/types/types"



export const socials = [
  {
    social: 'GitHub',
    username: 'masabinhok',
    url: 'https://github.com/masabinhok'
  },
  {
    social: 'LinkedIn',
    username: 'sabinshresthaa',
    url: 'https://www.linkedin.com/in/sabinshresthaa/'
  }
]

export const skills = ['TypeScript', 'NestJs', 'NodeJs', 'PostgreSQL', 'MongoDB', 'ReactJs', 'NextJs']
export const projects: Project[] = [
  {
    id: 1,
    name: 'e4.learnChess',
    url: 'https://e4-learnchess.vercel.app',
    github: 'https://github.com/masabinhok/e4',
    description: 'Practice chess openings, study lines, and manage repertoires with interactive tools.',
    tech: ['Next.js', 'Nest.js', 'Chess.js', 'MongoDB'],
    category: 'Game',
    color: 'from-amber-400 to-orange-600',
    icon: '♟️',
    status: 'Live'
  },
  {
    id: 2,
    name: 'cupidjsm',
    url: 'https://cupidjsm.vercel.app',
    github: 'https://github.com/masabinhok/cupid-jsm',
    description: 'Find matches, chat securely, and share media in a modern dating app.',
    tech: ['React.js', 'Node.js', 'Cloudinary', 'MongoDB'],
    category: 'Love',
    color: 'from-white to-pink-600',
    icon: '❤️',
    status: 'Live'
  },
  {
    id: 3,
    name: 'conexusHub',
    url: 'https://conexus-hub.vercel.app',
    github: 'https://github.com/masabinhok/conexusHub',
    description: 'Explore or list services and products in a user-friendly marketplace.',
    tech: ['React.js', 'Node.js', 'Cloudinary', 'MongoDB'],
    category: 'Finance',
    color: 'from-sky-400 to-blue-600',
    icon: '🛒',
    status: 'Live'
  }
]


export const Navlinks = [
  {
    name: 'home',
    link: '/'
  },
  {
    'name': 'dsa',
    'link': '/dsa',
  },
]