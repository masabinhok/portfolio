'use client'
import { CodeTab } from '@/types/types'
import { File } from 'lucide-react'
import React, { useState } from 'react'
import ControllerCode from './ControllerCode'
import DataCode from './DataCode'
import DtoCode from './DtoCode'

const Code = () => {
  const [tab, setTab] = useState<CodeTab>('me.controller.ts')

  const tabs: CodeTab[] = ['me.controller.ts', 'data.ts', 'hire-me.dto.ts'];

  const renderCode = () => {
    switch (tab) {
      case 'me.controller.ts':
        return <ControllerCode />
      case 'data.ts':
        return <DataCode />
      case 'hire-me.dto.ts':
        return <DtoCode />
      default:
        return <ControllerCode />
    }
  }
  return (
    <section className='border border-gray-300 rounded-xl  bg-gray-900 text-green-400 font-mono p-5 '>
      <div >
        <div className='flex border-b border-gray-800 mb-4'>
          {
            tabs.map((t) => (
              <div key={t} onClick={() => {
                setTab(t)
              }} className={`code-tab ${t === tab ? 'bg-gray-800' : ''} `}>
                <span>
                  <File size={16} />
                </span>
                <span className="text-gray-400 text-sm ml-2">{t}</span>
              </div>
            ))
          }
        </div>
        {renderCode()}
      </div>
    </section>
  )
}

export default Code


