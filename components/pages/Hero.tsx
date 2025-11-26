'use client'
import React, { useEffect, useState } from 'react'
import SkillNetwork from '../ui/SkillNetwork'
import Terminal from '../ui/Terminal';
import { CheckCircle, Loader2, Sparkles, Zap } from 'lucide-react';
import ExceptionalButton from '../ui/Button';
import MessageBox from '../ui/MessageBox';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'
import sabin from '@/public/sabin.jpg'
import Image from 'next/image';
import Link from 'next/link';


const Hero = () => {
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [hired, setHired] = useState<boolean>(false);
  const [hiring, setHiring] = useState<boolean>(false);
  const { width, height } = useWindowSize()
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [flipAvatar, setFlipAvatar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);
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

  // Check if device is mobile and set profile card visibility
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      setShowProfileCard(mobile); // Show by default on mobile
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

    // Reduce particles on mobile for performance
    const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 25;

    const particleData = Array.from({ length: particleCount }, (_, i) => ({
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

      <div className='flex max-lg:flex-col gap-10 items-center min-h-screen px-4 sm:px-6 lg:px-8'>
        <div
          onMouseLeave={() => !isMobile && setShowProfileCard(false)}
          className='flex flex-col p-2 mb-10 w-full relative'>
          {/* Header and subheader */}
          <div
            className='relative'

          >
            <h1
              onMouseEnter={() => !isMobile && setShowProfileCard(true)}
              onClick={() => isMobile && setShowProfileCard(!showProfileCard)}
              className={`lowercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold cursor-pointer transition-all duration-300 ${showProfileCard ? 'text-blue-400' : 'text-soft'} leading-tight hidden lg:block`}
            >
              Sabin Shrestha.
            </h1>

            {/* Profile Card */}
            {showProfileCard && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`absolute ${isMobile ? 'relative top-0 mt-4' : 'top-full left-0 mt-4'} bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-4 sm:p-6 shadow-2xl z-50 min-w-80 max-w-md w-full sm:w-auto overflow-hidden`}
              >

                {/* Floating glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                  <div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer flex-shrink-0"
                    onMouseEnter={() => setFlipAvatar(true)}
                    onMouseLeave={() => setFlipAvatar(false)}
                  >
                    {/* Avatar container with flip animation */}
                    <motion.div
                      className="relative w-full h-full"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: flipAvatar ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {/* Front side - Real photo */}
                      <div
                        className="absolute inset-0 rounded-full overflow-hidden border-2 border-blue-400"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <Image
                          src={sabin}
                          alt="Sabin Shrestha"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">🚀</div>';
                          }}
                        />
                      </div>

                      {/* Back side - Real photo (same image) */}
                      <div
                        className="absolute inset-0 rounded-full overflow-hidden border-2 border-purple-400"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <Image
                          src={sabin}
                          alt="Sabin Shrestha"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">🚀</div>';
                          }}
                        />
                      </div>
                    </motion.div>

                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base sm:text-lg">Sabin Shrestha</h3>
                    <div
                      onMouseEnter={() => setShowEmail(true)}
                      onMouseLeave={() => setShowEmail(false)}
                      className="relative cursor-pointer h-5 sm:h-6"
                    >
                      <motion.div
                        className="text-blue-400 text-xs sm:text-sm mb-2 relative"
                        animate={{
                          scale: showEmail ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span
                          className="block"
                          animate={{
                            opacity: showEmail ? 0 : 1,
                            y: showEmail ? -10 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Full-Stack Developer
                        </motion.span>
                        <motion.span

                          className="absolute top-0 left-0 block truncate pr-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: showEmail ? 1 : 0,
                            y: showEmail ? 0 : 10
                          }}
                          transition={{ duration: 0.3, delay: showEmail ? 0.1 : 0 }}
                        >
                          sabin.shrestha.er@gmail.com
                        </motion.span>
                      </motion.div>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                      I enjoy building scalable web applications with modern technologies.
                      <span className="hidden sm:inline"> Specialized in TypeScript, React/Next.js, Node/Nest.js.</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                        <span className="text-gray-400 truncate">Available for hire</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                        <span className="text-gray-400 truncate">Remote friendly</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="text-gray-400 text-xs flex-shrink-0">Connect:</span>
                        <section className='flex items-center justify-between w-full gap-2'>
                          <div className="flex gap-1 sm:gap-2">
                            <Link
                              href="https://github.com/masabinhok"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                            >
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                              </svg>
                            </Link>
                            <Link
                              href="https://www.linkedin.com/in/sabinshresthaa/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-700 hover:bg-blue-600 rounded flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                            >
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </Link>
                            <Link
                              href="https://x.com/masabinhok"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-5 h-5 sm:w-6 sm:h-6 bg-black hover:bg-gray-800 rounded flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                            >
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </Link>
                          </div>
                          <div className='flex items-center gap-1'>
                            <button
                              onClick={() => {
                                window.open('/resume.pdf', '_blank');
                              }}
                              className='text-muted text-xs cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700/50 px-2 py-1 rounded-md flex-shrink-0'
                            >
                              Resume
                            </button>
                          </div>

                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <h3 className='text-right text-muted text-sm sm:text-base hidden lg:block'>I don&apos;t just <span className='italic text-heading'>build APIs</span>, I  <span className='italic text-heading'>build foundations.</span></h3>

          <div className='mt-5 w-full'>
            <ExceptionalButton
              disabled={showMessageBox || hired || hiring}
              onMouseEnter={() => !isMobile && setShowProfileCard(false)}
              onClick={() => setShowMessageBox(!showMessageBox)}
              variant={hired ? "success" : "primary"}
              size="lg"
              className="w-full"
            >
              {renderHireStatus()}
            </ExceptionalButton>
          </div>
        </div>


        {/* Let&apos;s build a console like simulation here. */}
        <div className='w-full flex flex-col items-end mt-8 lg:mt-0'>
          {
            hiring || hired ? <Terminal setHiring={setHiring} hiring={hiring} setHired={setHired} /> : <SkillNetwork />
          }

        </div>


        {/* Floating particles for ambiance scattered throughout the page */}
        {
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`fixed w-1 h-1 ${particle.color} rounded-full opacity-40 pointer-events-none z-0 hidden sm:block`}
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
          ))
        }
      </div>

      {
        showMessageBox ? (
          <div className="fixed inset-0 z-50 px-4 sm:px-6 lg:px-8">
            <MessageBox setShowMessageBox={setShowMessageBox} setHiring={setHiring} />
          </div>
        ) : null
      }
    </section>
  )
}

export default Hero