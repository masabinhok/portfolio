'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import IcebergFront from './IcebergFront';
import IcebergBack from './IcebergBack';

const IcebergShowcase: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);

    const [isFlipped, setIsFlipped] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Flip to back
    const handleExploreBackend = useCallback(() => {
        if (isFlipped) return;
        setIsFlipped(true);

        const front = frontRef.current;
        const back = backRef.current;
        const card = cardRef.current;
        if (!front || !back) return;

        // Expand card height for the backend view (needs more space)
        const backHeight = 540; // Fixed height for backend view
        if (card) {
            gsap.to(card, { height: backHeight, duration: 0.4, ease: 'power2.inOut' });
        }

        if (prefersReducedMotion) {
            gsap.to(front, { opacity: 0, duration: 0.3 });
            gsap.to(back, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(front, {
                rotateY: 180,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            });
            gsap.fromTo(back,
                { rotateY: -180, opacity: 0 },
                { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
            );
        }
    }, [isFlipped, prefersReducedMotion]);

    // Flip back to front
    const handleBack = useCallback(() => {
        if (!isFlipped) return;
        setIsFlipped(false);

        const front = frontRef.current;
        const back = backRef.current;
        const card = cardRef.current;
        if (!front || !back) return;

        // Reset card height to auto (front side height)
        if (card) {
            gsap.to(card, { height: 'auto', duration: 0.4, ease: 'power2.inOut' });
        }

        if (prefersReducedMotion) {
            gsap.to(back, { opacity: 0, duration: 0.3 });
            gsap.to(front, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(back, {
                rotateY: -180,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            });
            gsap.fromTo(front,
                { rotateY: 180, opacity: 0 },
                { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
            );
        }
    }, [isFlipped, prefersReducedMotion]);

    return (
        <section className="w-full py-16">
            {/* Section header */}
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
                    Featured Project: <span className="text-blue-400">School Management System</span>
                </h2>
                <p className="text-muted text-sm sm:text-base">
                    A school management system with event-driven architecture
                </p>
            </div>

            {/* Flip Card Container */}
            <div
                ref={cardRef}
                className="relative w-full max-w-4xl mx-auto overflow-hidden"
                style={{ perspective: '1200px', transition: 'height 0.4s ease' }}
            >
                <IcebergFront
                    ref={frontRef}
                    onExploreBackend={handleExploreBackend}
                />

                <IcebergBack
                    ref={backRef}
                    isActive={isFlipped}
                    onBack={handleBack}
                    prefersReducedMotion={prefersReducedMotion}
                />
            </div>
        </section>
    );
};

export default IcebergShowcase;
