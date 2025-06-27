
import React from 'react'
import Console from './Console'

const Hero = () => {
  return (
    <section>
      <div className='flex flex-col p-2 w-fit mb-10'>
        {/* Header and subheader */}
        <h1 className='lowercase text-7xl font-bold text-soft'>
          Sabin Shrestha.
        </h1>
        <h3 className='text-right text-muted'>I don&apos;t just <span className='italic text-heading'>build APIs</span>, I  <span className='italic text-heading'>build foundations.</span></h3>
      </div>

      {/* Let's build a console like simulation here. */}
      <Console />

    </section>
  )
}

export default Hero