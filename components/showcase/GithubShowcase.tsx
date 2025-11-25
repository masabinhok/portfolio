'use client';

import Image from 'next/image';
import Link from 'next/link';


const GithubShowcase: React.FC = () => {
  return (
    <section className="w-full py-16">
      {/* Section header */}
      <div className="mb-8  text-right ">
        <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2 ">
          Git & Github: <span className="text-blue-400">Version control & Open Source</span>
        </h2>
        <p className="text-muted text-sm sm:text-base">
            oh! i obv know git, i am into OPEN SOURCE too !
        </p>
      </div>

      {/* Flip Card Container */}
      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden ml-10 max-sm:ml-0"
        style={{ perspective: '1200px', transition: 'height 0.4s ease' }}
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)',
            boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.06)',
            border: '1px solid rgba(255,255,255,0.05)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Layout: Image right, Copy left (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
    I open sourced an algorithm visualizer this hacktoberfest ! 
              </h3>
                <p className="text-muted text-xs sm:text-sm mb-4">
            Actively reviewd PRs and mentored new contributors to enhance their skills and understanding of algorithm visualization.
        </p>
             
              {/* Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com/masabinhok/vizit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
                  }}
                >
                    Github  
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.904-.014 3.296 0 .323.216.699.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
                </a>

<span className='text-sm text-amber-300'>16+ contributors, 28 merged PRs</span> 
    
              </div>
            </div>
            {/* Screenshot */}
            <Link href="https://vizitalg.vercel.app/" className="w-full md:w-1/2 flex-shrink-0">
              <Image
                src="/vizit-demo.png"
                alt="Vizit algorithm visualizer screenshot"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
                style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
              />
            </Link>

            
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

    
      </div>

      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden mt-5 mr-10 max-sm:mr-0"
        style={{ perspective: '1200px', transition: 'height 0.4s ease' }}
      >
        
        <div
          className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)',
            boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.06)',
            border: '1px solid rgba(255,255,255,0.05)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          
          {/* Layout: Image right, Copy left (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              {/* Screenshot */}
            <div className="w-full md:w-1/2 flex-shrink-0">
            <a href="https://holopin.io/@masabinhok" target="_blank" rel="noopener noreferrer">
  <img 
    src="https://holopin.me/masabinhok" 
    alt="@masabinhok's Holopin badges" 
  />
</a>

            </div>

            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                Holopin Badges for Open Source presence !!
                <br /><span className='text-sm text-amber-300'>
                  Contributed to | <Link className='text-blue-400' href="https://github.com/MODSetter/SurfSense"> Surfsense</Link> | <Link className='text-blue-400'  href="https://github.com/masbinhok/vizit"> Vizit</Link> | <Link className='text-blue-400' href="https://github.com/codse/animata"> Animata</Link> |
                  </span> 
              </h3>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com/masabinhok/vizit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
                  }}
                >
                    Visit my Github  
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.904-.014 3.296 0 .323.216.699.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
                </a>
    
              </div>
            </div>
          
            
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

    
      </div>
    </section>
  );
};

export default GithubShowcase;
