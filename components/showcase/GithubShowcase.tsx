'use client';

import Image from 'next/image';
import Link from 'next/link';


const GithubShowcase: React.FC = () => {
  return (
    <section className="w-full py-16">
      {/* Section header */}
      <div className="mb-12 text-right">
        <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-3">
          Git & Github: <span className="gradient-text">Version control & Open Source</span>
        </h2>
        <p className="text-muted text-base sm:text-lg">
          oh! i obv know git, i am into OPEN SOURCE too !
        </p>
      </div>

      {/* First Card - Vizit */}
      <div className="relative w-full max-w-4xl mx-auto mb-8 ml-10 max-sm:ml-0">
        <div className="premium-card p-8 sm:p-10 md:p-12 group">
          {/* Layout: Image right, Copy left (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                I open sourced an algorithm visualizer this hacktoberfest !
              </h3>
              <p className="text-muted text-sm sm:text-base mb-6 leading-relaxed">
                Actively reviewed PRs and mentored new contributors to enhance their skills and understanding of algorithm visualization.
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="https://github.com/masabinhok/vizit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm gradient-primary glow-effect smooth-transition hover:scale-105 active:scale-95"
                >
                  Github
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.904-.014 3.296 0 .323.216.699.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                  </svg>
                </Link>

                <span className='text-sm font-medium text-amber-300 flex items-center gap-2'>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  16+ contributors, 28 merged PRs
                </span>
              </div>
            </div>

            {/* Screenshot */}
            <Link href="https://vizitalg.vercel.app/" className="w-full md:w-1/2 flex-shrink-0 group/image">
              <div className="relative overflow-hidden rounded-2xl smooth-transition group-hover/image:scale-105">
                <Image
                  src="/vizit-demo.png"
                  alt="Vizit algorithm visualizer screenshot"
                  width={800}
                  height={450}
                  loading="lazy"
                  className="w-full h-auto shadow-2xl"
                  style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover/image:opacity-100 smooth-transition" />
              </div>
            </Link>
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
      </div>

      {/* Second Card - Holopin */}
      <div className="relative w-full max-w-4xl mx-auto mr-10 max-sm:mr-0">
        <div className="premium-card p-8 sm:p-10 md:p-12 group">
          {/* Layout: Image left, Copy right (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Screenshot */}
            <div className="w-full md:w-1/2 flex-shrink-0 group/image">
              <Link href="https://holopin.io/@masabinhok" target="_blank" rel="noopener noreferrer">
                <div className="relative overflow-hidden rounded-xl smooth-transition group-hover/image:scale-105">
                  <Image
                    src="https://holopin.me/masabinhok"
                    alt="@masabinhok's Holopin badges"
                    width={800}
                    height={250}
                    unoptimized
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover/image:opacity-100 smooth-transition" />
                </div>
              </Link>
            </div>

            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                Holopin Badges for Open Source presence !!
              </h3>
              <div className='text-sm text-amber-300 mb-6 flex flex-wrap gap-2 justify-center md:justify-start items-center'>
                <span className="text-muted">Contributed to</span>
                <Link className='text-blue-400 hover:text-blue-300 smooth-transition font-medium' href="https://github.com/MODSetter/SurfSense">Surfsense</Link>
                <span className="text-muted">•</span>
                <Link className='text-blue-400 hover:text-blue-300 smooth-transition font-medium' href="https://github.com/masabinhok/vizit">Vizit</Link>
                <span className="text-muted">•</span>
                <Link className='text-blue-400 hover:text-blue-300 smooth-transition font-medium' href="https://github.com/codse/animata">Animata</Link>
              </div>

              {/* Button */}
              <div className="flex justify-center md:justify-start">
                <Link
                  href="https://github.com/masabinhok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm gradient-primary glow-effect smooth-transition hover:scale-105 active:scale-95"
                >
                  Visit my Github
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.904-.014 3.296 0 .323.216.699.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
      </div>
    </section>
  );
};

export default GithubShowcase;
