'use client'
import React, { useEffect, useState } from 'react'
import SkillNetwork from '../SkillNetwork'
import Terminal from '../Terminal';
import { CheckCircle, Loader2, Sparkles, Zap } from 'lucide-react';
import ExceptionalButton from '../Button';
import MessageBox from '../MessageBox';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'


const Hero = () => {
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [hired, setHired] = useState<boolean>(false);
  const [hiring, setHiring] = useState<boolean>(false);
  const { width, height } = useWindowSize() // Add this for confetti

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
    moveX: number;
    moveY: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (hired) {
      setShowConfetti(true);
    }
  }, [hired]);

  // Initialize particles on client side only
  useEffect(() => {
    const colors = [
      'bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400',
      'bg-yellow-400', 'bg-red-400', 'bg-indigo-400', 'bg-cyan-400',
      'bg-emerald-400', 'bg-orange-400', 'bg-teal-400', 'bg-violet-400'
    ];

    const particleData = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: i * 0.3,
      moveX: Math.random() * 200 - 100,
      moveY: Math.random() * 150 - 75,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(particleData);
  }, []);


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
            hiring || hired ? <Terminal setHiring={setHiring} hiring={hiring} setHired={setHired} /> : <SkillNetwork />
          }

        </div>


        {/* Floating particles for ambiance scattered throughout the page */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`fixed w-1 h-1 ${particle.color} rounded-full opacity-40 pointer-events-none z-0`}
            animate={{
              x: [0, particle.moveX, 0],
              y: [0, particle.moveY, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      {
        showMessageBox ? <MessageBox setShowMessageBox={setShowMessageBox} setHiring={setHiring} /> : null
      }
    </section>
  )
}

export default Hero