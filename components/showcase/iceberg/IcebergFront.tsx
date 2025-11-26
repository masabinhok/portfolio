import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IcebergFrontProps {
    onExploreBackend: () => void;
}

const IcebergFront = forwardRef<HTMLDivElement, IcebergFrontProps>(({ onExploreBackend }, ref) => {
    return (
        <div
            ref={ref}
            className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
            style={{
                background: 'linear-gradient(145deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)',
                boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(255,255,255,0.05)',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Layout: Image left, Copy right (stacked on mobile) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                {/* Screenshot */}
                <Link href="https://sms-nest.vercel.app" className="w-full md:w-1/2 flex-shrink-0">
                    <Image
                        src="/sms-demo.png"
                        alt="SMS-Nest landing page screenshot"
                        width={800}
                        height={450}
                        loading="lazy"
                        className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
                        style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                    />
                </Link>

                {/* Copy */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                        I build landing pages so clean you could eat off them !<br /><span className='text-sm text-amber-300'>but please don’t.</span>
                    </h3>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <a
                            href="https://sms-nest.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
                            }}
                        >
                            Visit Live Site
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <button
                            onClick={onExploreBackend}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200"
                        >
                            Explore Backend
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
});

IcebergFront.displayName = 'IcebergFront';

export default IcebergFront;
