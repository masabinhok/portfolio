'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-white/5 mt-20">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold gradient-text mb-2">Sabin Shrestha</h3>
                        <p className="text-muted text-sm">
                            Full-Stack Developer building foundations, not just APIs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h4 className="text-sm font-semibold text-heading mb-3">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/#projects" className="text-muted hover:text-blue-400 smooth-transition text-sm">
                                Projects
                            </Link>
                            <Link href="https://github.com/masabinhok" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-blue-400 smooth-transition text-sm">
                                Open Source
                            </Link>
                            <Link href="/resume.pdf" target="_blank" className="text-muted hover:text-blue-400 smooth-transition text-sm">
                                Resume
                            </Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="text-center md:text-right">
                        <h4 className="text-sm font-semibold text-heading mb-3">Connect</h4>
                        <div className="flex gap-3 justify-center md:justify-end">
                            <Link
                                href="https://github.com/masabinhok"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white smooth-transition hover:scale-110"
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/sabinshresthaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-blue-400 hover:text-blue-300 smooth-transition hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </Link>
                            <Link
                                href="https://x.com/masabinhok"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white smooth-transition hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </Link>
                            <Link
                                href="mailto:sabin.shrestha.er@gmail.com"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-blue-400 hover:text-blue-300 smooth-transition hover:scale-110"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
                        <p className="flex items-center gap-1">
                            © {currentYear} Sabin Shrestha. Built with <Heart size={14} className="text-red-400 animate-pulse" style={{ animationDuration: '2s' }} /> and Next.js
                        </p>
                        <p className="text-xs">
                            Designed for <span className="text-green-400">Lighthouse 90+</span> • Zero WebGL
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
