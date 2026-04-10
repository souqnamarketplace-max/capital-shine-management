import { motion } from 'framer-motion';

export default function LoadingAnimation({ 
  label = 'Loading',
  duration = 1.6,
  showIcon = true 
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Progress Bar Container */}
      <div className="w-64 relative">
        {/* Background bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden relative">
          {/* Wave effect */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration, ease: 'easeInOut' }}
            style={{
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0%',
            }}
          />

          {/* Animated bubbles inside bar */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 w-1.5 h-1.5 bg-white/60 rounded-full"
              style={{ zIndex: 10 }}
              initial={{ left: '-10px', opacity: 0 }}
              animate={{
                left: ['0%', '100%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.25,
              }}
            />
          ))}

          {/* Moving mop icon */}
          {showIcon && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 text-lg"
              initial={{ left: '-20px' }}
              animate={{ left: 'calc(100% - 4px)' }}
              transition={{ duration, ease: 'easeInOut' }}
            >
              🧹
            </motion.div>
          )}
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        className="flex items-center gap-2 font-body text-sm text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{label}</span>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          ✨
        </motion.span>
      </motion.div>
    </div>
  );
}