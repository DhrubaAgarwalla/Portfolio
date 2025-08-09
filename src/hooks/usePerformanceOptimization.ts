import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  isMobile: boolean;
  isLowEndDevice: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  reducedMotion: boolean;
}

export const usePerformanceOptimization = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isMobile: false,
    isLowEndDevice: false,
    connectionSpeed: 'unknown',
    reducedMotion: false,
  });

  useEffect(() => {
    const detectPerformanceMetrics = () => {
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

      // Detect low-end device based on hardware concurrency and memory
      const isLowEndDevice = 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        // @ts-ignore - memory is not in all browsers
        (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
        false;

      // Detect connection speed
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      // @ts-ignore - connection is not in all browsers
      if (navigator.connection) {
        // @ts-ignore
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      // Detect reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setMetrics({
        isMobile,
        isLowEndDevice,
        connectionSpeed,
        reducedMotion,
      });
    };

    detectPerformanceMetrics();

    // Listen for viewport changes
    const handleResize = () => {
      setMetrics(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return metrics;
};

// Hook for optimizing animations based on device performance
export const useOptimizedAnimations = () => {
  const { isLowEndDevice, reducedMotion, isMobile } = usePerformanceOptimization();

  const getAnimationConfig = (defaultConfig: any) => {
    if (reducedMotion) {
      return {
        ...defaultConfig,
        transition: { duration: 0.01 },
        animate: defaultConfig.initial || {},
      };
    }

    if (isLowEndDevice || isMobile) {
      return {
        ...defaultConfig,
        transition: {
          ...defaultConfig.transition,
          duration: (defaultConfig.transition?.duration || 0.5) * 0.7,
        },
      };
    }

    return defaultConfig;
  };

  return { getAnimationConfig, isLowEndDevice, reducedMotion, isMobile };
};
