import { useEffect, useState, useRef } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollY(currentScrollY);
      setScrollProgress(currentScrollY / maxScroll);
      setIsScrollingDown(currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollY,
    scrollProgress,
    isScrollingDown,
  };
};

export const useScrollZoom = (zoomMultiplier = 0.0005) => {
  const { scrollY } = useScrollAnimation();
  const scale = 1 + (scrollY * zoomMultiplier);
  
  return {
    scale: Math.min(scale, 1.5), // Cap at 1.5x zoom
    transform: `scale(${Math.min(scale, 1.5)})`,
  };
};

export const useParallax = (speed = 0.5) => {
  const { scrollY } = useScrollAnimation();
  
  return {
    y: scrollY * speed,
    transform: `translateY(${scrollY * speed}px)`,
  };
};