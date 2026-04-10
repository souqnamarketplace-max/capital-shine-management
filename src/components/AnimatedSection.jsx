import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, clipPath: 'inset(0 0 6% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}