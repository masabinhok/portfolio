'use client';

import Image from 'next/image';
import Link from 'next/link';


const CliShowcase: React.FC = () => {
  return (
    <section className="w-full py-16">
      {/* Section header */}
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-3">
          Giving back to the community: <span className="gradient-text">create-nestjs-auth</span>
        </h2>
        <p className="text-muted text-base sm:text-lg">
          Why build auth from scratch when one command can do it for you?
        </p>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="premium-card p-8 sm:p-10 md:p-12 group">
          {/* Layout: Image right, Copy left (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20">
                <code className="text-red-400 font-mono text-sm sm:text-base font-semibold">
                  npx create-nestjs-auth@latest
                </code>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                One command. Complete auth setup.
              </h3>

              <p className='text-sm sm:text-base mb-4 text-muted leading-relaxed'>
                Working on decoupling storage layer, adding more templates, making it better.
              </p>

              <div className='flex items-center gap-2 mb-6 justify-center md:justify-start'>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className='text-sm font-medium text-green-400'>Open for Contributions</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="https://github.com/masabinhok/create-nestjs-auth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm gradient-primary glow-effect smooth-transition hover:scale-105 active:scale-95"
                >
                  Github
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.904-.014 3.296 0 .323.216.699.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                  </svg>
                </Link>

                <Link
                  href="https://www.npmjs.com/package/create-nestjs-auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-red-600 to-red-700 glow-effect smooth-transition hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                  }}
                >
                  NPM Package
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Screenshot */}
            <Link
              href="https://github.com/masabinhok/create-nestjs-auth?tab=contributing-ov-file#contributing-to-create-nestjs-auth"
              className="w-full md:w-1/2 flex-shrink-0 group/image"
            >
              <div className="relative overflow-hidden rounded-2xl smooth-transition group-hover/image:scale-105">
                <Image
                  src="/auth-demo.png"
                  alt="create-nestjs-auth CLI Demo"
                  width={800}
                  height={450}
                  loading="lazy"
                  className="w-full h-auto shadow-2xl"
                  style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover/image:opacity-100 smooth-transition" />
              </div>
            </Link>
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
      </div>
    </section>
  );
};

export default CliShowcase;

