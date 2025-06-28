'use client'
import React, { useState } from 'react'
import Code from './Code'
import Terminal from './Terminal';
import { CheckCircle, Rocket, Sparkles, Zap } from 'lucide-react';
import ExceptionalButton from './Button';


const Hero = () => {
  const [hired, setHired] = useState<boolean>(false);
  return (
    <section>
      <div className='flex gap-10'>
        <div className='flex flex-col p-2 mb-10 w-full'>
          {/* Header and subheader */}
          <h1 className='lowercase text-7xl font-bold text-soft'>
            Sabin Shrestha.
          </h1>
          <h3 className='text-right text-muted'>I don&apos;t just <span className='italic text-heading'>build APIs</span>, I  <span className='italic text-heading'>build foundations.</span></h3>
        </div>

        {/* Let's build a console like simulation here. */}
        <div className='w-full flex flex-col items-end'>
          {
            hired ? <Terminal /> : <Code />
          }
          <div className='mt-5 w-full'>
            <ExceptionalButton
              onClick={() => setHired(!hired)}
              variant={hired ? "success" : "primary"}
              size="lg"
            >
              {hired ? (
                <>
                  <CheckCircle size={24} />
                  <span>Hired!</span>
                  <Sparkles size={20} />
                </>
              ) : (
                <>
                  <Rocket size={24} />
                  <span>Hire Me</span>
                  <Zap size={20} />
                </>
              )}
            </ExceptionalButton>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero