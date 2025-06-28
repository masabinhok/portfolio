'use client'
import React, { useEffect, useState } from 'react'
import Code from './Code'
import Terminal from './Terminal';
import { CheckCircle, Loader2, Rocket, Sparkles, Zap } from 'lucide-react';
import ExceptionalButton from './Button';
import MessageBox from './MessageBox';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


const Hero = () => {
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [hired, setHired] = useState<boolean>(false);
  const [hiring, setHiring] = useState<boolean>(false);
  const { width, height } = useWindowSize() // Add this for confetti

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    if (hired) {
      setShowConfetti(true);
    }
  }, [hired]);


  useEffect(() => {
    const handleClick = () => {
      if (showConfetti) {
        setShowConfetti(false);
      }
    };

    if (showConfetti) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showConfetti]);


  const renderHireStatus = () => {
    if (hiring) {
      return (
        <>
          <span className="animate-pulse">Processing Hire...</span>
          <div className="animate-spin">
            <Loader2 size={16} />
          </div>
        </>
      )
    }
    if (hired) {
      return (
        <>
          <CheckCircle size={24} />
          <span>Hired!</span>
          <Sparkles size={20} />
        </>)
    } else {
      return (
        <>
          <Rocket size={24} />
          <span>Hire Me</span>
          <Zap size={20} />
        </>
      )
    }
  }

  return (
    <section>
      {/* Add confetti when hired */}
      {showConfetti && <Confetti width={width} height={height} />}

      <div className='flex gap-10 items-center min-h-screen'>
        <div className='flex flex-col p-2 mb-10 w-full'>
          {/* Header and subheader */}
          <h1 className='lowercase text-7xl font-bold text-soft'>
            Sabin Shrestha.
          </h1>
          <h3 className='text-right text-muted'>I don&apos;t just <span className='italic text-heading'>build APIs</span>, I  <span className='italic text-heading'>build foundations.</span></h3>

          <div className='mt-5 w-full'>
            <ExceptionalButton
              disabled={showMessageBox || hired || hiring}
              onClick={() => setShowMessageBox(!showMessageBox)}
              variant={hired ? "success" : "primary"}
              size="lg"
            >
              {renderHireStatus()}
            </ExceptionalButton>
          </div>
        </div>


        {/* Let&apos;s build a console like simulation here. */}
        <div className='w-full flex flex-col items-end'>
          {
            hiring || hired ? <Terminal setHiring={setHiring} hiring={hiring} setHired={setHired} /> : <Code />
          }

        </div>
      </div>

      {
        showMessageBox ? <MessageBox setShowMessageBox={setShowMessageBox} hired={hired} setHiring={setHiring} /> : null
      }
    </section>
  )
}

export default Hero