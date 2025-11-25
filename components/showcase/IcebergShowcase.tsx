'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

// ============================================
// ICEBERG SHOWCASE COMPONENT
// Flip card: Front (screenshot + copy) ↔ Back (detailed pipeline animation)
// 
// Architecture: Single Kafka hub with 3 services around it
//   - Student Service (left) → creates student → student.created → Kafka
//   - Auth Service (right) ← subscribes to student.created → creates user → user.created → Kafka
//   - Email Service (bottom) ← subscribes to user.created → sends welcome email
// ============================================

const IcebergShowcase: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Pipeline step states
  const [step, setStep] = useState(0);
  // Steps:
  // 0 = idle
  // 1 = student service creating student
  // 2 = student.created event traveling to kafka
  // 3 = auth service consuming, creating user
  // 4 = user.created event traveling to kafka
  // 5 = email service consuming, sending email
  // 6 = success - completed

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Effect to restart animation when animationStarted is reset while flipped
  useEffect(() => {
    if (isFlipped && !animationStarted && step === 0) {
      // Small delay to ensure state is fully reset
      const timer = setTimeout(() => {
        startPipelineAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFlipped, animationStarted, step]);

  // Flip to back and start pipeline animation
  const handleExploreBackend = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);

    const front = frontRef.current;
    const back = backRef.current;
    const card = cardRef.current;
    if (!front || !back) return;

    // Expand card height for the backend view (needs more space)
    const backHeight = 540; // Fixed height for backend view
    if (card) {
      gsap.to(card, { height: backHeight, duration: 0.4, ease: 'power2.inOut' });
    }

    if (prefersReducedMotion) {
      gsap.to(front, { opacity: 0, duration: 0.3 });
      gsap.to(back, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(front, {
        rotateY: 180,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      gsap.fromTo(back,
        { rotateY: -180, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
      );
    }

    setTimeout(() => startPipelineAnimation(), prefersReducedMotion ? 300 : 600);
  }, [isFlipped, prefersReducedMotion]);

  // Flip back to front
  const handleBack = useCallback(() => {
    if (!isFlipped) return;
    setIsFlipped(false);
    setAnimationStarted(false);
    setStep(0);

    const front = frontRef.current;
    const back = backRef.current;
    const card = cardRef.current;
    const dot1 = dot1Ref.current;
    const dot2 = dot2Ref.current;
    if (!front || !back) return;

    if (dot1) gsap.set(dot1, { opacity: 0, x: 0 });
    if (dot2) gsap.set(dot2, { opacity: 0, y: 0 });

    // Reset card height to auto (front side height)
    if (card) {
      gsap.to(card, { height: 'auto', duration: 0.4, ease: 'power2.inOut' });
    }

    if (prefersReducedMotion) {
      gsap.to(back, { opacity: 0, duration: 0.3 });
      gsap.to(front, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(back, {
        rotateY: -180,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      gsap.fromTo(front,
        { rotateY: 180, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
      );
    }
  }, [isFlipped, prefersReducedMotion]);

  // Detailed pipeline animation
  const startPipelineAnimation = useCallback(() => {
    if (animationStarted) return;
    setAnimationStarted(true);

    const dot1 = dot1Ref.current;
    const dot2 = dot2Ref.current;

    if (prefersReducedMotion) {
      // Simplified animation for reduced motion
      const steps = [1, 2, 3, 4, 5, 6];
      steps.forEach((s, i) => {
        setTimeout(() => setStep(s), i * 800);
      });
      return;
    }

    const tl = gsap.timeline();

    // Step 1: Student service creating student
    tl.add(() => setStep(1));
    tl.to({}, { duration: 1 });

    // Step 2: student.created event traveling to Kafka
    tl.add(() => setStep(2));
    if (dot1) {
      tl.set(dot1, { opacity: 1, x: 0, scale: 1 });
      tl.to(dot1, { x: 70, duration: 0.6, ease: 'power1.inOut' });
      tl.to(dot1, { opacity: 0, scale: 1.5, duration: 0.2 });
    }
    tl.to({}, { duration: 0.3 });

    // Step 3: Auth service consuming, creating user
    tl.add(() => setStep(3));
    tl.to({}, { duration: 1.2 });

    // Step 4: user.created event traveling from Kafka to Email (downward)
    tl.add(() => setStep(4));
    if (dot2) {
      tl.set(dot2, { opacity: 1, y: 0, scale: 1 });
      tl.to(dot2, { y: 50, duration: 0.6, ease: 'power1.inOut' });
      tl.to(dot2, { opacity: 0, scale: 1.5, duration: 0.2 });
    }
    tl.to({}, { duration: 0.3 });

    // Step 5: Email service consuming, sending email
    tl.add(() => setStep(5));
    tl.to({}, { duration: 1 });

    // Step 6: Success
    tl.add(() => setStep(6));

  }, [animationStarted, prefersReducedMotion]);

  // Helper to get node colors based on step
  const getNodeState = (node: 'student' | 'kafka' | 'auth' | 'email') => {
    switch (node) {
      case 'student':
        return step === 1 ? 'active' : step >= 2 ? 'done' : 'idle';
      case 'kafka':
        return (step === 2 || step === 4) ? 'active' : 'idle';
      case 'auth':
        return step === 3 ? 'active' : step >= 4 ? 'done' : 'idle';
      case 'email':
        return step === 5 ? 'active' : step === 6 ? 'done' : 'idle';
      default:
        return 'idle';
    }
  };

  const getNodeColor = (state: string) => {
    switch (state) {
      case 'active': return '#eab308'; // yellow
      case 'done': return '#22c55e'; // green
      default: return '#3b82f6'; // blue
    }
  };

  const getCurrentEvent = () => {
    if (step === 2) return 'student.created';
    if (step === 4) return 'user.created';
    return null;
  };

  const getCurrentAction = () => {
    switch (step) {
      case 1: return 'Student Service: Creating student...';
      case 2: return 'student.created → Kafka';
      case 3: return 'Auth Service: Creating user credentials...';
      case 4: return 'user.created → Kafka';
      case 5: return 'Email Service: Sending welcome email...';
      case 6: return '✓ Student onboarded successfully!';
      default: return 'Waiting...';
    }
  };

  return (
    <section className="w-full py-16">
      {/* Section header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
          Featured Project: <span className="text-blue-400">School Management System</span>
        </h2>
        <p className="text-muted text-sm sm:text-base">
          A school management system with event-driven architecture
        </p>
      </div>

      {/* Flip Card Container */}
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl mx-auto overflow-hidden"
        style={{ perspective: '1200px', transition: 'height 0.4s ease' }}
      >
        {/* ========== FRONT SIDE ========== */}
        <div
          ref={frontRef}
          className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)',
            boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.06)',
            border: '1px solid rgba(255,255,255,0.05)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Layout: Image left, Copy right (stacked on mobile) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            {/* Screenshot */}
            <Link href="https://sms-nest.vercel.app" className="w-full md:w-1/2 flex-shrink-0">
              <Image
                src="/sms-demo.png"
                alt="SMS-Nest landing page screenshot"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
                style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
              />
            </Link>

            {/* Copy */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
    I build landing pages so clean you could eat off them !<br /><span className='text-sm text-amber-300'>but please don’t.</span> 
              </h3>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://sms-nest.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
                  }}
                >
                  Visit Live Site
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={handleExploreBackend}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200"
                >
                  Explore Backend
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ========== BACK SIDE ========== */}
        <div
          ref={backRef}
          className="absolute inset-0 w-full  rounded-2xl overflow-hidden p-4 sm:p-6"
          style={{
            background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #0a0a0a 100%)',
            boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            opacity: 0,
            transform: 'rotateY(-180deg)',
            minHeight: '420px',
          }}
        >
          {/* Back link */}
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Pipeline header */}
          <div className="text-center mt-6 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-1">
              Event-Driven Architecture
            </h3>
            <p className="text-gray-500 text-xs">
              Student Onboarding Flow
            </p>
          </div>

          {/* Current Event Display */}
          <div className="text-center mb-2 h-6 ml-6">
            {getCurrentEvent() && (
              <span className="inline-block text-yellow-400 px-3 py-1 rounded font-mono text-xs sm:text-xs animate-pulse">
                {getCurrentEvent()}
              </span>
            )}
          </div>

          {/* Pipeline Visualization - Hub and Spoke Layout */}
          <div className="relative flex flex-col items-center">
            
            {/* Main Row: Student Service → Kafka (center) → Auth Service */}
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              
              {/* Student Service Node */}
              <div className="relative flex flex-col items-center">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: '#111827',
                    border: `2px solid ${getNodeColor(getNodeState('student'))}`,
                    boxShadow: getNodeState('student') !== 'idle' ? `0 0 20px ${getNodeColor(getNodeState('student'))}40` : 'none'
                  }}
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={getNodeColor(getNodeState('student'))} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {getNodeState('student') === 'active' && (
                    <div className="absolute inset-0 rounded-xl animate-ping opacity-30" style={{ border: `2px solid ${getNodeColor('active')}` }} />
                  )}
                </div>
                <span className="text-gray-400 text-[10px] sm:text-xs mt-1.5 text-center font-medium">Student Service</span>
                {step === 1 && (
                  <span className="text-yellow-400 text-[9px] mt-0.5 animate-pulse">creates student</span>
                )}
              </div>

              {/* Arrow: Student → Kafka */}
              <div className="relative w-16 sm:w-20 h-8 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 32">
                  <defs>
                    <marker id="arrow1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={step >= 2 ? '#eab308' : '#3b82f6'} opacity="0.8"/>
                    </marker>
                  </defs>
                  <line x1="0" y1="16" x2="92" y2="16" stroke={step >= 2 ? '#eab308' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow1)" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite"/>
                  </line>
                </svg>
                {/* Traveling dot 1: Student → Kafka */}
                <div 
                  ref={dot1Ref}
                  className="absolute pointer-events-none"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)',
                    boxShadow: '0 0 12px #fbbf24, 0 0 24px #f59e0b',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0,
                  }}
                />
                {step === 2 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-yellow-400 font-mono whitespace-nowrap">
                    student.created
                  </span>
                )}
              </div>

              {/* Kafka Node (CENTER HUB) */}
              <div className="relative flex flex-col items-center">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)',
                    border: `2px solid ${getNodeColor(getNodeState('kafka'))}`,
                    boxShadow: getNodeState('kafka') === 'active' 
                      ? `0 0 30px ${getNodeColor('active')}50, inset 0 0 20px ${getNodeColor('active')}20` 
                      : '0 0 20px rgba(59,130,246,0.15)'
                  }}
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke={getNodeColor(getNodeState('kafka'))}>
                    <circle cx="12" cy="7" r="2.5" strokeWidth="1.5"/>
                    <circle cx="6" cy="17" r="2.5" strokeWidth="1.5"/>
                    <circle cx="18" cy="17" r="2.5" strokeWidth="1.5"/>
                    <line x1="12" y1="9.5" x2="6" y2="14.5" strokeWidth="1.5"/>
                    <line x1="12" y1="9.5" x2="18" y2="14.5" strokeWidth="1.5"/>
                    <line x1="8.5" y1="17" x2="15.5" y2="17" strokeWidth="1.5"/>
                  </svg>
                    {/* {getNodeState('kafka') === 'active' && (
                      <div className="absolute inset-0 rounded-2xl animate-pulse opacity-40" style={{ border: `2px solid ${getNodeColor('active')}` }} />
                    )} */}
                </div>
                <span className="text-gray-300 text-xs sm:text-sm mt-1.5 font-semibold">Kafka</span>
              </div>

              {/* Arrow: Kafka → Auth */}
              <div className="relative w-16 sm:w-20 h-8 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 32">
                  <defs>
                    <marker id="arrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={step >= 3 ? '#22c55e' : '#3b82f6'} opacity="0.8"/>
                    </marker>
                  </defs>
                  <line x1="0" y1="16" x2="92" y2="16" stroke={step >= 3 ? '#22c55e' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow2)" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite"/>
                  </line>
                </svg>
              </div>

              {/* Auth Service Node */}
              <div className="relative flex flex-col items-center">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: '#111827',
                    border: `2px solid ${getNodeColor(getNodeState('auth'))}`,
                    boxShadow: getNodeState('auth') !== 'idle' ? `0 0 20px ${getNodeColor(getNodeState('auth'))}40` : 'none'
                  }}
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={getNodeColor(getNodeState('auth'))} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  {getNodeState('auth') === 'active' && (
                    <div className="absolute inset-0 rounded-xl animate-ping opacity-30" style={{ border: `2px solid ${getNodeColor('active')}` }} />
                  )}
                </div>
                <span className="text-gray-400 text-[10px] sm:text-xs mt-1.5 text-center font-medium">Auth Service</span>
                {step === 3 && (
                  <span className="text-yellow-400 text-[9px] mt-0.5 animate-pulse">creates user</span>
                )}
              </div>
            </div>

            {/* Second Row: Auth → Kafka → Email (user.created flow) */}
            <div className="flex items-center justify-center mt-4">
              {/* Spacer to align with Auth */}
              <div className="w-14 sm:w-16" />
              <div className="w-16 sm:w-20" />
              
              {/* Arrow from Auth back to Kafka (curved or just positioned) */}
              <div className="relative flex items-center justify-center">
                {/* Vertical connector from Kafka down */}
                <svg className="w-20 h-12 sm:w-24 sm:h-14" viewBox="0 0 100 60">
                  <defs>
                    <marker id="arrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={step >= 5 ? '#22c55e' : '#3b82f6'} opacity="0.8"/>
                    </marker>
                  </defs>
                  {/* Line going down from Kafka to Email */}
                  <path d="M60 0 L60 52" stroke={step >= 5 ? '#22c55e' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow3)" fill="none" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite"/>
                  </path>
                </svg>
                {step === 4 && (
               <span className="absolute -top-4 left-1/2 -translate-x-[40%] text-[8px] sm:text-[10px] text-green-400 font-mono whitespace-nowrap">
  user.created
</span>


                )}
                {/* Traveling dot 2 for user.created (Auth → Kafka) */}
                <div 
                  ref={dot2Ref}
                  className="absolute pointer-events-none"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #22c55e 0%, #16a34a 100%)',
                    boxShadow: '0 0 12px #22c55e, 0 0 24px #16a34a',
                    right: '33px',
                    top: '0',
                    opacity: 0,
                  }}
                />
              </div>
              
              <div className="w-16 sm:w-20" />
              <div className="w-14 sm:w-16" />
            </div>

            {/* Email Service at bottom center */}
            <div className="relative flex flex-col items-center mt-2 ml-6">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ 
                  background: '#111827',
                  border: `2px solid ${getNodeColor(getNodeState('email'))}`,
                  boxShadow: getNodeState('email') !== 'idle' ? `0 0 20px ${getNodeColor(getNodeState('email'))}40` : 'none'
                }}
              >
                {step === 6 ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={getNodeColor(getNodeState('email'))} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {getNodeState('email') === 'active' && (
                  <div className="absolute inset-0 rounded-xl animate-ping opacity-30" style={{ border: `2px solid ${getNodeColor('active')}` }} />
                )}
              </div>
              <span className="text-gray-400 text-[10px] sm:text-xs mt-1.5 text-center font-medium">Email Service</span>
              {step === 5 && (
                <span className="text-yellow-400 text-[9px] mt-0.5 animate-pulse">sends welcome email</span>
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center mt-4 ml-6">
            <p 
              className="text-xs sm:text-sm font-medium transition-all duration-300"
              style={{ 
                color: step === 6 ? '#22c55e' : step > 0 ? '#eab308' : '#6b7280'
              }}
            >
              {getCurrentAction()}
            </p>
            {step === 6 && (
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                Welcome email sent with login credentials 
              </p>
            )}
          </div>

          {/* Replay button */}
          {step === 6 && (
            <div className="text-center mt-2 ml-6">
              <button
                onClick={() => {
                  const dot1 = dot1Ref.current;
                  const dot2 = dot2Ref.current;
                  if (dot1) gsap.set(dot1, { opacity: 0, x: 0, scale: 1 });
                  if (dot2) gsap.set(dot2, { opacity: 0, y: 0, scale: 1 });
                  setStep(0);
                  setAnimationStarted(false);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mx-auto"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Replay Animation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IcebergShowcase;
