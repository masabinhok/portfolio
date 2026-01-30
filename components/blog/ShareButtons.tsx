'use client'

import React from 'react'
import { Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted hover:text-blue-400 hover:bg-blue-400/10 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted hover:text-blue-600 hover:bg-blue-600/10 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <button
        onClick={copyToClipboard}
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted hover:text-green-400 hover:bg-green-400/10 transition-all"
        aria-label="Copy link"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  )
}

export default ShareButtons
