import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTAButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  as = 'button',
  ...props 
}) {
  const [showSparkle, setShowSparkle] = useState(false);

  const handleClick = (e) => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 600);
    onClick?.(e);
  };

  const baseClasses = {
    primary: 'bg-gold text-primary hover:bg-gold/90',
    secondary: 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
    outline: 'border border-border text-foreground hover:bg-muted hover:border-secondary/40',
  }[variant];

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2.5 text-sm font-body font-semibold rounded-xl px-7 py-3.5 transition-all duration-300 overflow-hidden shine-sweep ${baseClasses} ${className}`}
      {...props}
    >
      {/* Shine sweep is handled by CSS class */}
      {children}

      {/* Sparkle effect on click */}
      {showSparkle && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ 
                left: '50%', 
                top: '50%',
                opacity: 1,
                scale: 0 
              }}
              animate={{ 
                left: ['50%', `${30 + i * 15}%`],
                top: ['50%', `${20 + i * 20}%`],
                opacity: [1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.6, 
                ease: 'easeOut',
                delay: i * 0.05
              }}
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'currentColor',
              }}
            />
          ))}
        </>
      )}
    </Component>
  );
}