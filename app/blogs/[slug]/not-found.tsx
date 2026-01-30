import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function BlogNotFound() {
  return (
    <main className="w-full min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-full glass mx-auto mb-6 flex items-center justify-center">
          <FileQuestion size={40} className="text-muted" />
        </div>
        <h1 className="text-3xl font-bold text-heading mb-4">Article Not Found</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Blog</span>
        </Link>
      </div>
    </main>
  )
}
