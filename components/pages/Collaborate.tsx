'use client'
import { Contact, Mail, Github, Linkedin } from 'lucide-react'
import React, { useState } from 'react'
import ExceptionalButton from '../ui/Button'
import ContactBox from '../ui/ContactBox'
import Link from 'next/link'


const Collaborate = () => {
  const [showContactBox, setShowContactBox] = useState<boolean>(false);
  return (
    <section className='pt-10 pb-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto mt-20'>
        <div className='premium-card p-10 sm:p-12 md:p-16 text-center group relative overflow-hidden'>
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 smooth-transition" />

          <div className="relative z-10">
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight'>
              Interested in <span className="gradient-text">collaborating</span>?
            </h2>
            <p className='text-muted text-base sm:text-lg mb-8 max-w-2xl mx-auto'>
              Let&apos;s build something amazing together. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Link
                href="mailto:sabin.shrestha.er@gmail.com"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-blue-400 hover:text-blue-300 smooth-transition hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </Link>
              <Link
                href="https://github.com/masabinhok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white smooth-transition hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sabinshresthaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-blue-400 hover:text-blue-300 smooth-transition hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>

            <ExceptionalButton
              onClick={() => setShowContactBox(true)}
              size='lg'
              className="glow-effect"
            >
              <Contact className='w-5 h-5' />
              <span>Get In Touch</span>
            </ExceptionalButton>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
      </div>
      {
        showContactBox && (
          <ContactBox setShowContactBox={setShowContactBox} />
        )
      }
    </section>
  )
}

export default Collaborate