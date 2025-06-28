import React, { useState, useEffect, useRef } from 'react';

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
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentStepInGroup, setCurrentStepInGroup] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stepGroups: StepGroup[] = [
    {
      steps: [
        { text: '$ curl -X POST /api/candidate/hire-me-please', delay: 300, duration: 800 },
        { text: '⟩ @Controller("candidate") initializing...', delay: 400, duration: 600 },
        { text: '✓ Connection established', delay: 300, duration: 500 }
      ],
      groupDelay: 800,
      persistent: false
    },
    {
      steps: [
        { text: '⟩ @Roles(Role.HR, Role.MANAGER) checking...', delay: 400, duration: 700 },
        { text: '✓ Authorization granted', delay: 300, duration: 500 },
        { text: '⟩ Parsing @Body() hireMeDto...', delay: 300, duration: 600 }
      ],
      groupDelay: 900,
      persistent: false
    },
    {
      steps: [
        { text: '⟩ candidateService.getProfile() executing...', delay: 500, duration: 900 },
        { text: '  fullName: "Sabin Shrestha"', delay: 200, duration: 400 },
        { text: '  email: "sabin.shrestha.er@gmail.com"', delay: 200, duration: 400 },
        { text: '  GitHub: "masabinhok"', delay: 200, duration: 400 },
        { text: '  LinkedIn: "sabinshresthaa"', delay: 200, duration: 400 },
        { text: '✓ Profile loaded successfully', delay: 300, duration: 500 }
      ],
      groupDelay: 1000,
      persistent: false
    },
    {
      steps: [
        { text: '⟩ Validating candidate.skills[]...', delay: 400, duration: 700 },
        { text: '  ✓ TypeScript', delay: 150, duration: 300 },
        { text: '  ✓ NestJs', delay: 150, duration: 300 },
        { text: '  ✓ NodeJs', delay: 150, duration: 300 },
        { text: '  ✓ PostgreSQL', delay: 150, duration: 300 },
        { text: '  ✓ MongoDB', delay: 150, duration: 300 },
        { text: '  ✓ ReactJs', delay: 150, duration: 300 },
        { text: '  ✓ NextJs', delay: 150, duration: 300 }
      ],
      groupDelay: 1200,
      persistent: false
    },
    {
      steps: [
        { text: '⟩ Running DTO validations...', delay: 400, duration: 600 },
        { text: '✓ @IsEmail() passed', delay: 250, duration: 400 },
        { text: '✓ @IsKind() passed', delay: 250, duration: 400 },
        { text: '✓ @IsGenerous() passed', delay: 250, duration: 400 },
        { text: '✓ @HasPositiveVibes() passed', delay: 250, duration: 400 },
        { text: '✓ @MinLength(10) validation passed', delay: 300, duration: 500 }
      ],
      groupDelay: 1000,
      persistent: false
    },
    {
      steps: [
        { text: '⟩ Checking candidate.isAvailable...', delay: 400, duration: 700 },
        { text: '✓ candidate.isAvailable = true', delay: 300, duration: 500 },
        { text: '⟩ emailService.sendOffer(dto) executing...', delay: 500, duration: 800 },
        { text: '✓ Offer email sent successfully', delay: 400, duration: 600 }
      ],
      groupDelay: 1500,
      persistent: false
    },
    {
      steps: [
        { text: '', delay: 400, duration: 0 },
        { text: '┌─────────────────────────────────────────┐', delay: 0, duration: 100 },
        { text: '│             RESPONSE:                   │', delay: 0, duration: 150 },
        { text: '│                                         │', delay: 0, duration: 150 },
        { text: '│      I will be in touch soon !!!        │', delay: 0, duration: 150 },
        { text: '│                                         │', delay: 0, duration: 150 },
        { text: '│                                         │', delay: 0, duration: 50 },
        { text: '│       // Ready to contribute !!!        │', delay: 0, duration: 150 },
        { text: '└─────────────────────────────────────────┘', delay: 0, duration: 100 },
        { text: '', delay: 0, duration: 0 },
        { text: '$ HTTP 200 OK', delay: 200, duration: 400 }
      ],
      groupDelay: 0,
      persistent: true
    }
  ];

  const typeText = async (text: string, duration: number) => {
    setIsTyping(true);
    setCurrentText('');

    if (text === '') {
      setIsTyping(false);
      await new Promise(resolve => setTimeout(resolve, 200));
      return;
    }

    const chars = text.split('');
    const typeSpeed = Math.max(20, duration / chars.length);

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
      setCurrentGroupIndex(0);
      setCurrentStepInGroup(0);
      setCurrentText('');
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    const runAnimation = async () => {
      setIsComplete(false);

      for (let groupIndex = 0; groupIndex < stepGroups.length; groupIndex++) {
        const group = stepGroups[groupIndex];
        setCurrentGroupIndex(groupIndex);

        // For persistent groups, build up the displayed lines
        const groupLines: string[] = [];

        // Process each step in the group
        for (let stepIndex = 0; stepIndex < group.steps.length; stepIndex++) {
          const step = group.steps[stepIndex];
          setCurrentStepInGroup(stepIndex);

          await new Promise(resolve => setTimeout(resolve, step.delay));
          await typeText(step.text, step.duration);

          // For persistent groups, add to group lines
          if (group.persistent) {
            groupLines.push(step.text);
            setDisplayedLines([...groupLines]);
          }

          setCurrentText('');
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Wait for group delay before moving to next group
        await new Promise(resolve => setTimeout(resolve, group.groupDelay));

        // Clear displayed lines for non-persistent groups
        if (!group.persistent) {
          setDisplayedLines([]);
        }
      }

      // Mark as complete and hired
      setIsComplete(true);
      setTimeout(() => {
        setHiring(false);
        setHired(true);
      }, 1000);
    };

    runAnimation();
  }, [hiring, setHired, setHiring]);

  const renderTerminalContent = () => {
    if (!hiring && !isComplete) {
      return (
        <div className="text-gray-500 flex items-center">
          <span className="">$masabinhok: </span>
          <span className="animate-pulse duration-75 ml-1">user says yayy!!!</span>
          <span>_</span>
         
        </div>
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
          <div className="text-gray-600 flex items-center">
            <span className="animate-pulse">$masabinhok: processing</span>
            <span className="animate-pulse ml-1">_</span>
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
          <span className="text-gray-400 text-sm ml-2">hiring-terminal v3.0.0</span>
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