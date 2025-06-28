import React, { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { Zap, CheckCircle, Sparkles, Rocket, Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

type ButtonVariant = 'primary' | 'success' | 'danger' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ExceptionalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const ExceptionalButton = ({
  onClick,
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ExceptionalButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Generate floating particles on hover
  useEffect(() => {
    if (isHovering && !disabled) {
      const interval = setInterval(() => {
        const newParticle: Particle = {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 2 + 1.5
        };
        setParticles(prev => [...prev.slice(-6), newParticle]);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isHovering, disabled]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple: Ripple = { id: Math.random(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    if (onClick) onClick(e);
  };

  // Size variants
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  // Color variants
  const variantClasses: Record<ButtonVariant, {
    base: string;
    hover: string;
    shadow: string;
    glow: string;
  }> = {
    primary: {
      base: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600',
      hover: 'from-purple-500 via-pink-500 to-red-500',
      shadow: 'shadow-purple-500/40',
      glow: 'rgba(147, 51, 234, 0.4)'
    },
    success: {
      base: 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600',
      hover: 'from-emerald-400 via-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/40',
      glow: 'rgba(16, 185, 129, 0.4)'
    },
    danger: {
      base: 'bg-gradient-to-r from-red-500 via-red-600 to-pink-600',
      hover: 'from-red-400 via-red-500 to-pink-500',
      shadow: 'shadow-red-500/40',
      glow: 'rgba(239, 68, 68, 0.4)'
    },
    secondary: {
      base: 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800',
      hover: 'from-gray-500 via-gray-600 to-gray-700',
      shadow: 'shadow-gray-500/40',
      glow: 'rgba(107, 114, 128, 0.4)'
    }
  };

  const currentVariant = variantClasses[variant];

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={disabled}
      className={`
        relative overflow-hidden font-semibold rounded-xl cursor-pointer
        transition-all duration-300 transform-gpu w-full
        ${sizeClasses[size]}
        ${currentVariant.base}
        ${disabled
          ? 'opacity-50 cursor-not-allowed'
          : `text-white hover:scale-105 active:scale-95 ${isHovering ? `shadow-2xl ${currentVariant.shadow}` : 'shadow-lg'
          }`
        }
        ${isPressed ? 'scale-95' : ''}
        ${className}
      `}
      style={{
        boxShadow: isHovering && !disabled
          ? `0 0 40px ${currentVariant.glow}, 0 0 80px ${currentVariant.glow}20`
          : undefined
      }}
      {...props}
    >
      {/* Animated background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentVariant.hover} transition-opacity duration-300 ${isHovering && !disabled ? 'opacity-100' : 'opacity-0'
        }`}></div>

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full animate-ping opacity-60"></div>
        </div>
      ))}

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`
          }}
        >
          <div
            className="rounded-full bg-white animate-pulse opacity-70"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          ></div>
        </div>
      ))}

      {/* Sliding highlight */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform skew-x-12 transition-transform duration-700 ${isHovering && !disabled ? 'translate-x-full' : '-translate-x-full'
        }`}></div>

      {/* Border glow */}
      <div className={`absolute inset-0 rounded-xl border transition-opacity duration-300 ${isHovering && !disabled ? 'opacity-60 border-white' : 'opacity-0 border-transparent'
        }`}></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

export default ExceptionalButton;
