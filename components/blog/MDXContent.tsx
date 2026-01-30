import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

// Custom components for MDX
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return <h2 id={id} className="scroll-mt-24" {...props} />
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return <h3 id={id} className="scroll-mt-24" {...props} />
  },
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return <h4 id={id} className="scroll-mt-24" {...props} />
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="relative group" {...props}>
      {props.children}
    </pre>
  ),
  code: (props: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInline = !props.className?.includes('language-')
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-white/10 text-pink-400 text-sm font-mono"
          {...props}
        />
      )
    }
    return <code {...props} />
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const src = typeof props.src === 'string' ? props.src : ''
    return (
      <span className="block my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={props.alt || ''}
          className="rounded-xl max-w-full h-auto"
        />
        {props.alt && (
          <span className="block text-center text-sm text-muted mt-2">
            {props.alt}
          </span>
        )}
      </span>
    )
  },
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full" {...props} />
    </div>
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-muted my-6"
      {...props}
    />
  ),
}

interface MDXContentProps {
  source: string
}

const MDXContent: React.FC<MDXContentProps> = ({ source }) => {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  )
}

export default MDXContent
