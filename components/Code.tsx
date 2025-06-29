'use client'
import { CodeTab } from '@/types/types'
import {  Database, Code2 } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import ControllerCode from './ControllerCode'
import DataCode from './DataCode'


const Code = () => {
  const [tab, setTab] = useState<CodeTab>('candidate.controller.ts')

  const tabs = useMemo(() => [
    {
      id: 'candidate.controller.ts' as CodeTab,
      label: 'candidate.controller.ts',
      icon: Code2,
      description: 'API Controller'
    },
    {
      id: 'data.ts' as CodeTab,
      label: 'data.ts',
      icon: Database,
      description: 'Data Layer'
    },

  ], [])

  const renderCode = () => {
    switch (tab) {
      case 'candidate.controller.ts':
        return <ControllerCode />
      case 'data.ts':
        return <DataCode />
      default:
        return <ControllerCode />
    }
  }

  const handleTabChange = (tabId: CodeTab) => {
    setTab(tabId)
  }

  const handleKeyDown = (e: React.KeyboardEvent, tabId: CodeTab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleTabChange(tabId)
    }
  }

  return (
    <section
      className='border border-gray-300 rounded-xl bg-gray-900 text-green-400 font-mono shadow-lg overflow-hidden w-full'
      role="tabpanel"
      aria-label="Code viewer"
    >
      <div className='flex border-b border-gray-700 bg-gray-800 items-center'>
        <div className='flex w-full' role="tablist">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = t.id === tab

            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                onKeyDown={(e) => handleKeyDown(e, t.id)}
                className={`
                    flex items-center justify-center px-4 py-3 text-sm font-medium transition-all duration-200
                  border-r border-gray-700 flex-1 group relative 
                  ${isActive
                    ? 'bg-gray-900 text-green-400 border-b-2 border-green-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-750 '
                  }
                  focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-inset
                `}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                tabIndex={0}
                title={t.description}
              >
                <Icon
                  size={16}
                  className={`transition-colors ${isActive ? 'text-green-400' : 'text-gray-500 group-hover:text-gray-300'}`}
                />
                <span className="ml-2 select-none ">
                  {t.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div
        className='p-5 min-h-96 bg-gray-900'
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        {renderCode()}
      </div>
    </section>
  )
}

export default Code