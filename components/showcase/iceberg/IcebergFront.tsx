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
            className="premium-card p-8 sm:p-10 md:p-12 group"
        >
            {/* Layout: Image left, Copy right (stacked on mobile) */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Screenshot */}
                <Link href="https://sms-nest.vercel.app" className="w-full md:w-1/2 flex-shrink-0 group/image">
                    <div className="relative overflow-hidden rounded-2xl smooth-transition group-hover/image:scale-105">
                        <Image
                            src="/sms-demo.png"
                            alt="SMS-Nest landing page screenshot"
                            width={800}
                            height={450}
                            loading="lazy"
                            className="w-full h-auto shadow-2xl"
                            style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover/image:opacity-100 smooth-transition" />
                    </div>
                </Link>

                {/* Copy */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                        I build landing pages so clean you could eat off them!
                        <br />
                        <span className='text-base text-amber-300 font-normal'>but please don&apos;t.</span>
                    </h3>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="https://sms-nest.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm gradient-primary glow-effect smooth-transition hover:scale-105 active:scale-95"
                        >
                            Visit Live Site
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                        <button
                            onClick={onExploreBackend}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm border-2 border-blue-500/30 hover:border-blue-500 bg-blue-500/5 hover:bg-blue-500/10 smooth-transition hover:scale-105 active:scale-95"
                        >
                            Explore Backend
                            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg> */}
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
    );
});

IcebergFront.displayName = 'IcebergFront';

export default IcebergFront;
