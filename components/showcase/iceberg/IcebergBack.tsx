import React, { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import gsap from 'gsap';
import PipelineNode from './PipelineNode';

interface IcebergBackProps {
    isActive: boolean;
    onBack: () => void;
    prefersReducedMotion: boolean;
}

export interface IcebergBackHandle {
    reset: () => void;
}

const IcebergBack = forwardRef<HTMLDivElement, IcebergBackProps>(({ isActive, onBack, prefersReducedMotion }, ref) => {
    const dot1Ref = useRef<HTMLDivElement>(null);
    const dot2Ref = useRef<HTMLDivElement>(null);

    const [step, setStep] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);

    // Reset state when not active
    useEffect(() => {
        if (!isActive) {
            setStep(0);
            setAnimationStarted(false);
            if (dot1Ref.current) gsap.set(dot1Ref.current, { opacity: 0, x: 0, scale: 1 });
            if (dot2Ref.current) gsap.set(dot2Ref.current, { opacity: 0, y: 0, scale: 1 });
        }
    }, [isActive]);

    // Start animation when active
    useEffect(() => {
        if (isActive && !animationStarted) {
            const timer = setTimeout(() => {
                startPipelineAnimation();
            }, prefersReducedMotion ? 300 : 600);
            return () => clearTimeout(timer);
        }
    }, [isActive, animationStarted, prefersReducedMotion]);

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

    return (
        <div
            ref={ref}
            className="absolute inset-0 w-full rounded-2xl overflow-hidden p-4 sm:p-6"
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
                onClick={onBack}
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

                    <PipelineNode type="student" state={getNodeState('student')} step={step} />

                    {/* Arrow: Student → Kafka */}
                    <div className="relative w-16 sm:w-20 h-8 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 100 32">
                            <defs>
                                <marker id="arrow1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill={step >= 2 ? '#eab308' : '#3b82f6'} opacity="0.8" />
                                </marker>
                            </defs>
                            <line x1="0" y1="16" x2="92" y2="16" stroke={step >= 2 ? '#eab308' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow1)" opacity="0.7">
                                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
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

                    <PipelineNode type="kafka" state={getNodeState('kafka')} step={step} />

                    {/* Arrow: Kafka → Auth */}
                    <div className="relative w-16 sm:w-20 h-8 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 100 32">
                            <defs>
                                <marker id="arrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill={step >= 3 ? '#22c55e' : '#3b82f6'} opacity="0.8" />
                                </marker>
                            </defs>
                            <line x1="0" y1="16" x2="92" y2="16" stroke={step >= 3 ? '#22c55e' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow2)" opacity="0.7">
                                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
                            </line>
                        </svg>
                    </div>

                    <PipelineNode type="auth" state={getNodeState('auth')} step={step} />
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
                                    <polygon points="0 0, 8 3, 0 6" fill={step >= 5 ? '#22c55e' : '#3b82f6'} opacity="0.8" />
                                </marker>
                            </defs>
                            {/* Line going down from Kafka to Email */}
                            <path d="M60 0 L60 52" stroke={step >= 5 ? '#22c55e' : '#3b82f6'} strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow3)" fill="none" opacity="0.7">
                                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
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
                    <PipelineNode type="email" state={getNodeState('email')} step={step} />
                </div>
            </div>

            {/* Status Message */}
            <div className="text-center mt-4 ml-6" aria-live="polite">
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
    );
});

IcebergBack.displayName = 'IcebergBack';

export default IcebergBack;
