import React from 'react';

interface PipelineNodeProps {
    type: 'student' | 'kafka' | 'auth' | 'email';
    state: 'idle' | 'active' | 'done';
    step: number;
}

const PipelineNode: React.FC<PipelineNodeProps> = ({ type, state, step }) => {
    const getNodeColor = (state: string) => {
        switch (state) {
            case 'active': return '#eab308'; // yellow
            case 'done': return '#22c55e'; // green
            default: return '#3b82f6'; // blue
        }
    };

    const getIcon = () => {
        const color = getNodeColor(state);
        switch (type) {
            case 'student':
                return (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={color} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'kafka':
                return (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke={color}>
                        <circle cx="12" cy="7" r="2.5" strokeWidth="1.5" />
                        <circle cx="6" cy="17" r="2.5" strokeWidth="1.5" />
                        <circle cx="18" cy="17" r="2.5" strokeWidth="1.5" />
                        <line x1="12" y1="9.5" x2="6" y2="14.5" strokeWidth="1.5" />
                        <line x1="12" y1="9.5" x2="18" y2="14.5" strokeWidth="1.5" />
                        <line x1="8.5" y1="17" x2="15.5" y2="17" strokeWidth="1.5" />
                    </svg>
                );
            case 'auth':
                return (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={color} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                );
            case 'email':
                if (step === 6) {
                    return (
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    );
                }
                return (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={color} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const getLabel = () => {
        switch (type) {
            case 'student': return 'Student Service';
            case 'kafka': return 'Kafka';
            case 'auth': return 'Auth Service';
            case 'email': return 'Email Service';
        }
    };

    const getSubLabel = () => {
        if (type === 'student' && step === 1) return 'creates student';
        if (type === 'auth' && step === 3) return 'creates user';
        if (type === 'email' && step === 5) return 'sends welcome email';
        return null;
    };

    const isKafka = type === 'kafka';
    const sizeClass = isKafka ? 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl' : 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl';

    return (
        <div className="relative flex flex-col items-center">
            <div
                className={`${sizeClass} flex items-center justify-center transition-all duration-300`}
                style={{
                    background: isKafka ? 'linear-gradient(135deg, #111827 0%, #1e293b 100%)' : '#111827',
                    border: `2px solid ${getNodeColor(state)}`,
                    boxShadow: state === 'active'
                        ? `0 0 30px ${getNodeColor('active')}50, inset 0 0 20px ${getNodeColor('active')}20`
                        : state !== 'idle' ? `0 0 20px ${getNodeColor(state)}40` : 'none'
                }}
            >
                {getIcon()}
                {state === 'active' && (
                    <div className={`absolute inset-0 ${isKafka ? 'rounded-2xl' : 'rounded-xl'} animate-ping opacity-30`} style={{ border: `2px solid ${getNodeColor('active')}` }} />
                )}
            </div>
            <span className={`text-gray-400 ${isKafka ? 'text-xs sm:text-sm font-semibold' : 'text-[10px] sm:text-xs font-medium'} mt-1.5 text-center`}>
                {getLabel()}
            </span>
            {getSubLabel() && (
                <span className="text-yellow-400 text-[9px] mt-0.5 animate-pulse">
                    {getSubLabel()}
                </span>
            )}
        </div>
    );
};

export default PipelineNode;
