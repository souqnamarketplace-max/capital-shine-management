import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Before', 
  afterLabel = 'After',
  autoWipe = true 
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Auto-wipe animation on mount
  useEffect(() => {
    if (!autoWipe) return;
    
    const timer = setTimeout(() => {
      let pos = 50;
      const interval = setInterval(() => {
        pos += 0.5;
        if (pos >= 100) {
          clearInterval(interval);
          pos = 100;
        }
        setSliderPos(pos);
      }, 10);
    }, 300);

    return () => clearTimeout(timer);
  }, [autoWipe]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const newPos = ((x - rect.left) / rect.width) * 100;
      setSliderPos(Math.max(0, Math.min(100, newPos)));
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden shadow-lg select-none cursor-col-resize"
        style={{ aspectRatio: '16/10' }}
      >
        {/* After image (background) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            draggable="false"
          />
          {/* Shine effect after wipe */}
          {sliderPos > 95 && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shineSweep 0.7s ease-in-out forwards',
              }}
            />
          )}
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-col-resize transition-opacity"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Handle thumb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-primary" />
              <div className="w-0.5 h-4 bg-primary" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 text-white text-xs font-body font-semibold rounded-lg backdrop-blur-sm">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 text-white text-xs font-body font-semibold rounded-lg backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>
    </motion.div>
  );
}