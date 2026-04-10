import { motion } from 'framer-motion';

const iconAnimations = {
  spray: {
    animate: { opacity: [1, 1, 0.6, 1], scaleY: [1, 1.1, 0.95, 1] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  vacuum: {
    animate: { rotate: [-2, 2, -2] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  broom: {
    animate: { y: [-2, 2, -2] },
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
  sparkle: {
    animate: { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function AnimatedIcon({ 
  children, 
  animationType = 'sparkle',
  className = ''
}) {
  const animation = iconAnimations[animationType] || iconAnimations.sparkle;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      animate={animation.animate}
      transition={animation.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}