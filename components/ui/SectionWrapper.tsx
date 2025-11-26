'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SectionWrapperProps {
    children: React.ReactNode
    className?: string
    animation?: 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'none'
    delay?: number
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Trigger animation when entering viewport
                    setTimeout(() => {
                        setIsVisible(true)
                    }, delay)
                } else {
                    // Reset animation when leaving viewport
                    setIsVisible(false)
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
            }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [delay])

    const getAnimationClass = () => {
        if (animation === 'none') return ''
        if (!isVisible) return 'opacity-0'

        const animations = {
            'fade-up': 'animate-fade-in-up',
            'fade-down': 'animate-fade-in-down',
            'slide-left': 'animate-slide-in-left',
            'slide-right': 'animate-slide-in-right',
            'scale': 'animate-scale-in',
        }

        return animations[animation] || 'animate-fade-in-up'
    }

    return (
        <div
            ref={sectionRef}
            className={`${getAnimationClass()} ${className}`}
        >
            {children}
        </div>
    )
}

export default SectionWrapper
