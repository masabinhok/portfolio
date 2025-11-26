'use client'

import React from 'react'

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

            {/* SVG Pattern Overlay */}
            <svg
                className="absolute inset-0 w-full h-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Grid Pattern */}
                    <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-gray-700/20"
                        />
                    </pattern>

                    {/* Dot Pattern */}
                    <pattern
                        id="dots"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx="2"
                            cy="2"
                            r="1"
                            fill="currentColor"
                            className="text-blue-400/20"
                        />
                    </pattern>

                    {/* Gradient Definitions */}
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                    </linearGradient>

                    <radialGradient id="radial1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Apply Patterns */}
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect width="100%" height="100%" fill="url(#dots)" />

                {/* Animated SVG Shapes */}
                <g className="animate-pulse-glow" style={{ animationDuration: '8s' }}>
                    <circle cx="10%" cy="20%" r="100" fill="url(#radial1)" />
                    <circle cx="90%" cy="80%" r="150" fill="url(#radial1)" />
                    <circle cx="50%" cy="50%" r="120" fill="url(#radial1)" />
                </g>

                {/* Decorative Lines */}
                <g className="opacity-20">
                    <path
                        d="M0,100 Q250,50 500,100 T1000,100"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDuration: '4s' }}
                    />
                    <path
                        d="M0,200 Q250,150 500,200 T1000,200"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDuration: '5s', animationDelay: '1s' }}
                    />
                </g>
            </svg>

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}

export default AnimatedBackground
