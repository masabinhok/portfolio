import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface TerminalProps {
  hiring: boolean;
  setHiring: (hiring: boolean) => void;
  setHired: (hired: boolean) => void;
}

interface StepGroup {
  steps: { text: string; delay: number; duration: number }[];
  groupDelay: number;
  persistent: boolean;
}

const Terminal = ({ hiring, setHiring, setHired }: TerminalProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showReadingPhase, setShowReadingPhase] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stepGroups: StepGroup[] = useMemo(() => [
    {
      steps: [
        { text: '$ curl -X POST /api/candidate/hire-me-please', delay: 50, duration: 150 },
        { text: '⟩ @Controller("candidate") initializing...', delay: 100, duration: 200 },
        { text: '✓ Connection established', delay: 50, duration: 100 }
      ],
      groupDelay: 100,
      persistent: true
    },
    {
      steps: [
        { text: '⟩ @Roles(Role.HR, Role.MANAGER) checking...', delay: 80, duration: 150 },
        { text: '✓ Authorization granted', delay: 60, duration: 100 },
      ],
      groupDelay: 150,
      persistent: true
    },
    {
      steps: [
        { text: '⟩ candidateService.getProfile() executing...', delay: 100, duration: 200 },
        { text: '✓ Profile loaded successfully', delay: 50, duration: 100 }
      ],
      groupDelay: 120,
      persistent: true
    },
    {
      steps: [
        { text: '⟩ Validating candidate.skills[]...', delay: 80, duration: 150 },
        { text: '  ✓ React/TypeScript', delay: 40, duration: 80 },
        { text: '  ✓ NestJS/Node.js', delay: 40, duration: 80 },
        { text: '  ✓ PostgreSQL/MongoDB', delay: 40, duration: 80 },
        { text: '  ✓ Docker/AWS', delay: 40, duration: 80 },
      ],
      groupDelay: 200,
      persistent: true
    },
    {
      steps: [
        { text: '⟩ Running DTO validations...', delay: 60, duration: 120 },
        { text: '✓ All validations passed', delay: 50, duration: 100 },
      ],
      groupDelay: 150,
      persistent: true
    },
    {
      steps: [
        { text: '⟩ Checking candidate.isAvailable...', delay: 80, duration: 150 },
        { text: '✓ candidate.isAvailable = true', delay: 50, duration: 100 },
        { text: '⟩ emailService.sendOffer(dto) executing...', delay: 100, duration: 180 },
        { text: '✓ Offer email sent successfully', delay: 60, duration: 120 }
      ],
      groupDelay: 200,
      persistent: true
    },
    {
      steps: [
        { text: '✓ Response: I am honoured to receive the offer!', delay: 100, duration: 200 },
        { text: '$ HTTP 201 CREATED - Candidate hired successfully! 🎉', delay: 80, duration: 150 }
      ],
      groupDelay: 0,
      persistent: true
    }
  ], []);

  const typeText = async (text: string, duration: number) => {
    setIsTyping(true);
    setCurrentText('');

    if (text === '') {
      setIsTyping(false);
      await new Promise(resolve => setTimeout(resolve, 50));
      return;
    }

    const chars = text.split('');
    const typeSpeed = Math.max(8, duration / chars.length); // Much faster typing

    for (let i = 0; i <= chars.length; i++) {
      await new Promise(resolve => setTimeout(resolve, typeSpeed));
      setCurrentText(chars.slice(0, i).join(''));

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }

    setIsTyping(false);
  };

  useEffect(() => {
    if (!hiring) {
      setDisplayedLines([]);
      setCurrentText('');
      setIsTyping(false);
      setIsComplete(false);
      setShowReadingPhase(false);
      return;
    }

    const runAnimation = async () => {
      setIsComplete(false);
      setShowReadingPhase(false);
      const allLines: string[] = [];

      for (let groupIndex = 0; groupIndex < stepGroups.length; groupIndex++) {
        const group = stepGroups[groupIndex];

        // Process each step in the group
        for (let stepIndex = 0; stepIndex < group.steps.length; stepIndex++) {
          const step = group.steps[stepIndex];

          await new Promise(resolve => setTimeout(resolve, step.delay));
          await typeText(step.text, step.duration);

          // Add to all lines and update display
          allLines.push(step.text);
          setDisplayedLines([...allLines]);

          setCurrentText('');
          await new Promise(resolve => setTimeout(resolve, 50)); // Very short pause between lines
        }

        // Wait for group delay before moving to next group
        await new Promise(resolve => setTimeout(resolve, group.groupDelay));
      }

      // Show reading phase - let user read everything
      setIsComplete(true);
      setShowReadingPhase(true);

      // Wait for user to read (3 seconds), then clear and complete
      setTimeout(() => {
        setDisplayedLines([]);
        setCurrentText('');
        setShowReadingPhase(false);

        setTimeout(() => {
          setHiring(false);
          setHired(true);
        }, 500);
      }, 3000); // 3 seconds to read
    };

    runAnimation();
  }, [hiring, setHired, setHiring, stepGroups]);

  const renderTerminalContent = () => {
    if (!hiring && !isComplete && !showReadingPhase) {
      return (
        <>
          <div className="text-green-500 flex items-center mb-2">
            <span className="animate-pulse">✓ Hiring process completed successfully!</span>
          </div>
          <div className="text-green-400 flex items-center mb-1">
            <span>Response: I am hounoured to receive this offer.</span>
          </div>
          <div className="text-gray-500 flex items-center">
            <span>$masabinhok: </span>
            <span className="ml-1">Ready to contribute !!!</span>
            <span className="animate-pulse ml-1">_</span>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-1">
        {/* Display completed lines */}
        {displayedLines.map((line, index) => (
          <div key={index} className="text-green-400 leading-relaxed font-mono text-sm">
            {line}
          </div>
        ))}

        {/* Display current typing text */}
        {currentText && (
          <div className="text-green-400 leading-relaxed font-mono text-sm">
            {currentText}
            {isTyping && <span className="animate-pulse">_</span>}
          </div>
        )}

        {/* Show processing indicator when between steps */}
        {hiring && !currentText && !isTyping && !isComplete && (
          <div className="text-yellow-400 flex items-center">
            <span className="animate-pulse">⚡ Processing at light speed...</span>
            <span className="animate-bounce ml-2">⚡</span>
          </div>
        )}

        {/* Show reading phase indicator */}
        {showReadingPhase && (
          <div className="text-cyan-400 flex items-center mt-4 pt-2 border-t border-gray-700">
            <span className="animate-pulse">📖 Take a moment to review...</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className='border border-gray-300 rounded-xl bg-gray-900 text-green-400 font-mono w-full h-80 flex flex-col'>
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-5 pb-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm ml-2">
            {hiring ? 'hiring-terminal v4.0.0 - TURBO MODE ⚡' : 'hiring-terminal v4.0.0'}
          </span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div
        ref={scrollRef}
        className="flex-1 p-5 pt-3 overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {renderTerminalContent()}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};


export default Terminal;
