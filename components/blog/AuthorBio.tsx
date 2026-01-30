'use client'

import React from 'react'
import { Author } from '@/types/blog'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

interface AuthorBioProps {
  author: Author
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
          {author.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-heading text-lg">{author.name}</h3>
          <p className="text-sm text-blue-400 mb-2">{author.role}</p>
          <p className="text-sm text-muted">{author.bio}</p>
          
          {/* Social Links */}
          <div className="flex gap-3 mt-4">
            {author.social.github && (
              <Link
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </Link>
            )}
            {author.social.linkedin && (
              <Link
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </Link>
            )}
            {author.social.twitter && (
              <Link
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio
