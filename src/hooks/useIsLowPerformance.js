import { useEffect, useState } from 'react';

export default function useIsLowPerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check device memory (if available)
    const deviceMemory = navigator.deviceMemory;
    if (deviceMemory && deviceMemory < 4) {
      setIsLowPerformance(true);
      return;
    }

    // Check CPU cores
    const hardwareConcurrency = navigator.hardwareConcurrency;
    if (hardwareConcurrency && hardwareConcurrency < 2) {
      setIsLowPerformance(true);
      return;
    }

    // Check connection speed
    if (navigator.connection) {
      const { effectiveType } = navigator.connection;
      if (effectiveType === '2g' || effectiveType === '3g') {
        setIsLowPerformance(true);
        return;
      }
    }

    setIsLowPerformance(false);
  }, []);

  return isLowPerformance;
}