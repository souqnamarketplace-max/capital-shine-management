import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CleaningTransitionSection({ 
  children, 
  className = '',
  bgColor = 'bg-background'
}) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden transition-colors duration-1000 ${bgColor} ${
        isInView ? 'brightness-100' : 'brightness-90'
      }`}
    >
      {/* Wipe reveal overlay */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      )}

      {/* Content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>

      {/* Subtle sparkle accents */}
      {isInView && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(244, 197, 66, 0.4)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
                delay: 0.5 + i * 0.15,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}