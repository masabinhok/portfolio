
'use client'
import { Contact } from 'lucide-react'
import React, { useState } from 'react'
import ExceptionalButton from '../ui/Button'
import ContactBox from '../ui/ContactBox'


const Collaborate = () => {
  const [showContactBox, setShowContactBox] = useState<boolean>(false);
  return (
    <section className='pt-10 pb-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto mt-20 text-center'>
        <div className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8'>
          <h2 className='text-3xl font-bold text-white mb-4'>Interested in collaborating?</h2>
          <p className='text-gray-300 mb-6'>Let&apos;s build something amazing together</p>
          <ExceptionalButton onClick={() => setShowContactBox(true)} size='md'>
            <Contact className='w-5 h-5' />
            <span>Get In Touch</span>
          </ExceptionalButton>
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