import { motion } from 'framer-motion';

const iconAnimations = {
  spray: {
    animate: { opacity: [1, 1, 0.6, 1], scaleY: [1, 1.08, 0.95, 1] },
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 },
  },
  vacuum: {
    animate: { rotate: [-2, 2, -2] },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 },
  },
  broom: {
    animate: { y: [-2, 2, -2] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 },
  },
  sparkle: {
    animate: { opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 },
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